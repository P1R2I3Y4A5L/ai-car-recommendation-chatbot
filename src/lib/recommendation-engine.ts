import type { CarSummary, ExtractedPreferences } from "@/types";
import { listCars, searchCarsByName } from "@/lib/car-queries";

export interface RankedCar {
  car: CarSummary;
  score: number;
  reasons: string[];
  tradeoffs: string[];
}

// Score a car against the extracted preferences
function scoreCarAgainstPreferences(
  car: CarSummary,
  preferences: ExtractedPreferences
): { score: number; reasons: string[]; tradeoffs: string[] } {
  let score = 0;
  const reasons: string[] = [];
  const tradeoffs: string[] = [];
  const { filters } = preferences;

  // Budget fit (0-30 points)
  if (filters.budgetMax !== undefined) {
    if (car.priceMin <= filters.budgetMax) {
      const budgetUtilisation = car.priceMin / filters.budgetMax;
      if (budgetUtilisation >= 0.7 && budgetUtilisation <= 1.0) {
        score += 30;
        reasons.push(`Priced at ${formatPrice(car)} — well within your budget`);
      } else if (budgetUtilisation < 0.7) {
        score += 20;
        reasons.push(`Priced at ${formatPrice(car)} — comfortably under budget`);
        tradeoffs.push("Lower-priced options may have fewer features");
      }
    }
  } else {
    score += 15; // neutral if no budget specified
  }

  // Fuel type match (0-20 points)
  if (filters.fuelType) {
    if (car.fuelType.toLowerCase() === filters.fuelType.toLowerCase()) {
      score += 20;
      reasons.push(`${capitalize(car.fuelType)} fuel type matches your preference`);
    } else {
      tradeoffs.push(`This is a ${car.fuelType} car — you requested ${filters.fuelType}`);
    }
  }

  // Body type match (0-20 points)
  if (filters.bodyType) {
    if (car.bodyType.toLowerCase() === filters.bodyType.toLowerCase()) {
      score += 20;
      reasons.push(`${capitalize(car.bodyType)} body type matches your requirement`);
    } else {
      score -= 10;
      tradeoffs.push(`Body type is ${car.bodyType}, not ${filters.bodyType}`);
    }
  }

  // Seating capacity (0-15 points)
  if (filters.seatingCapacity && car.seatingCapacity !== null) {
    if (car.seatingCapacity >= filters.seatingCapacity) {
      score += 15;
      reasons.push(`${car.seatingCapacity} seats — meets your ${filters.seatingCapacity}-seater requirement`);
    } else {
      score -= 20;
      tradeoffs.push(`Only ${car.seatingCapacity} seats — you need ${filters.seatingCapacity}`);
    }
  }

  // Mileage bonus (0-10 points)
  if (car.mileageKmpl !== null && car.mileageKmpl > 0) {
    if (car.mileageKmpl >= 20) {
      score += 10;
      reasons.push(`Excellent fuel efficiency: ${car.mileageKmpl} km/l`);
    } else if (car.mileageKmpl >= 15) {
      score += 5;
      reasons.push(`Good fuel efficiency: ${car.mileageKmpl} km/l`);
    }
    if (filters.minMileage && car.mileageKmpl < filters.minMileage) {
      score -= 10;
      tradeoffs.push(`Mileage (${car.mileageKmpl} km/l) is below your minimum (${filters.minMileage} km/l)`);
    }
  }

  // Electric range bonus
  if (car.electricRangeKm !== null && car.electricRangeKm > 0) {
    if (car.electricRangeKm >= 400) {
      score += 10;
      reasons.push(`Long electric range: ${car.electricRangeKm} km`);
    } else if (car.electricRangeKm >= 250) {
      score += 5;
      reasons.push(`Decent electric range: ${car.electricRangeKm} km`);
    }
  }

  // Safety bonus (0-5 points)
  if (car.ncapRating !== null) {
    if (car.ncapRating === 5) {
      score += 5;
      reasons.push("5-star safety rating");
    } else if (car.ncapRating >= 4) {
      score += 3;
      reasons.push(`${car.ncapRating}-star safety rating`);
    }
  }

  return { score, reasons, tradeoffs };
}

function formatPrice(car: CarSummary): string {
  if (car.currency === "INR") {
    return `₹${car.priceMin}–${car.priceMax} ${car.priceUnit}`;
  }
  if (car.currency === "USD") {
    return `\$${(car.priceMin * 1000).toLocaleString()}–\$${(car.priceMax * 1000).toLocaleString()}`;
  }
  return `${car.currency} ${car.priceMin}–${car.priceMax}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Main recommendation function
export async function getRecommendations(
  preferences: ExtractedPreferences,
  limit = 5
): Promise<RankedCar[]> {
  const cars = await listCars({
    ...preferences.filters,
    limit: 50, // fetch more, then rank
    page: 1,
  });

  const ranked: RankedCar[] = cars.cars.map((car) => {
    const { score, reasons, tradeoffs } = scoreCarAgainstPreferences(
      car,
      preferences
    );
    return { car, score, reasons, tradeoffs };
  });

  return ranked
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Resolve car names from free text (for comparison requests)
export async function resolveCarNames(names: string[]): Promise<CarSummary[]> {
  if (names.length === 0) return [];
  return searchCarsByName(names);
}
