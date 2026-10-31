import type { Car, ComparisonData, ComparisonField, CarSummary } from "@/types";
import { getCarsByIds } from "@/lib/car-queries";

// Convert Car to CarSummary for comparison headers
function carToSummary(car: Car): CarSummary {
  return {
    id: car.id,
    slug: car.slug,
    name: car.name,
    brand: car.brand,
    model: car.model,
    year: car.year,
    bodyType: car.bodyType,
    fuelType: car.fuelType,
    transmission: car.transmission,
    market: car.market,
    currency: car.currency,
    priceMin: car.priceMin,
    priceMax: car.priceMax,
    priceUnit: car.priceUnit,
    imageUrl: car.imageUrl,
    description: car.description,
    seatingCapacity: car.specs?.seatingCapacity ?? null,
    mileageKmpl: car.specs?.mileageKmpl ?? null,
    electricRangeKm: car.specs?.electricRangeKm ?? null,
    ncapRating: car.specs?.ncapRating ?? null,
  };
}

// Format a numeric value as string, falling back to "N/A"
function fmt(val: number | null | undefined, suffix = ""): string {
  if (val === null || val === undefined) return "Not available";
  return `${val}${suffix}`;
}

// Format price range
function fmtPrice(car: Car): string {
  if (car.currency === "INR") {
    return `₹${car.priceMin}–${car.priceMax} ${car.priceUnit}`;
  }
  if (car.currency === "USD") {
    return `$${(car.priceMin * 1000).toLocaleString()}–$${(car.priceMax * 1000).toLocaleString()}`;
  }
  return `${car.currency} ${car.priceMin}–${car.priceMax}`;
}

// Generate comparison summary text
function generateSummary(cars: Car[]): string {
  const parts: string[] = [];

  // Price comparison
  const sorted = [...cars].sort((a, b) => a.priceMin - b.priceMin);
  if (sorted.length >= 2 && sorted[0].currency === sorted[sorted.length - 1].currency) {
    parts.push(`${sorted[0].name} is the most affordable option starting at ${fmtPrice(sorted[0])}, while ${sorted[sorted.length - 1].name} is priced higher at ${fmtPrice(sorted[sorted.length - 1])}.`);
  }

  // Mileage comparison
  const byMileage = [...cars]
    .filter((c) => c.specs?.mileageKmpl != null)
    .sort((a, b) => (b.specs?.mileageKmpl ?? 0) - (a.specs?.mileageKmpl ?? 0));
  if (byMileage.length >= 2) {
    parts.push(`For fuel efficiency, ${byMileage[0].name} leads with ${byMileage[0].specs?.mileageKmpl} km/l.`);
  }

  // Electric range comparison
  const byRange = [...cars]
    .filter((c) => c.specs?.electricRangeKm != null)
    .sort((a, b) => (b.specs?.electricRangeKm ?? 0) - (a.specs?.electricRangeKm ?? 0));
  if (byRange.length >= 1) {
    parts.push(`${byRange[0].name} offers the longest electric range at ${byRange[0].specs?.electricRangeKm} km.`);
  }

  // Safety
  const safeCars = cars.filter((c) => c.specs?.ncapRating === 5);
  if (safeCars.length > 0) {
    parts.push(`${safeCars.map((c) => c.name).join(" and ")} ${safeCars.length === 1 ? "has" : "have"} a 5-star safety rating.`);
  }

  if (parts.length === 0) {
    parts.push("Comparison data is limited for these vehicles. Please check individual car pages for details.");
  }

  return parts.join(" ");
}

// Build comparison fields array
function buildComparisonFields(cars: Car[]): ComparisonField[] {
  const fields: ComparisonField[] = [
    {
      key: "price",
      label: "Price Range",
      values: cars.map(fmtPrice),
    },
    {
      key: "bodyType",
      label: "Body Type",
      values: cars.map((c) => c.bodyType),
    },
    {
      key: "fuelType",
      label: "Fuel Type",
      values: cars.map((c) => c.fuelType),
    },
    {
      key: "transmission",
      label: "Transmission",
      values: cars.map((c) => c.transmission),
    },
    {
      key: "seating",
      label: "Seating Capacity",
      values: cars.map((c) => fmt(c.specs?.seatingCapacity, " seats")),
      higherIsBetter: true,
    },
    {
      key: "engine",
      label: "Engine",
      values: cars.map((c) =>
        c.specs?.engineCC ? `${c.specs.engineCC} cc` : "Electric / N/A"
      ),
    },
    {
      key: "power",
      label: "Power",
      values: cars.map((c) => fmt(c.specs?.powerBhp, " bhp")),
      higherIsBetter: true,
    },
    {
      key: "torque",
      label: "Torque",
      values: cars.map((c) => fmt(c.specs?.torqueNm, " Nm")),
      higherIsBetter: true,
    },
    {
      key: "mileage",
      label: "Fuel Efficiency",
      values: cars.map((c) =>
        c.specs?.mileageKmpl ? `${c.specs.mileageKmpl} km/l` : "Not available"
      ),
      higherIsBetter: true,
    },
    {
      key: "electricRange",
      label: "Electric Range",
      values: cars.map((c) =>
        c.specs?.electricRangeKm ? `${c.specs.electricRangeKm} km` : "Not applicable"
      ),
      higherIsBetter: true,
    },
    {
      key: "battery",
      label: "Battery",
      values: cars.map((c) =>
        c.specs?.batteryKwh ? `${c.specs.batteryKwh} kWh` : "Not applicable"
      ),
    },
    {
      key: "groundClearance",
      label: "Ground Clearance",
      values: cars.map((c) => fmt(c.specs?.groundClearanceMm, " mm")),
      higherIsBetter: true,
    },
    {
      key: "bootSpace",
      label: "Boot Space",
      values: cars.map((c) => fmt(c.specs?.bootLitres, " L")),
      higherIsBetter: true,
    },
    {
      key: "safety",
      label: "Safety Rating",
      values: cars.map((c) =>
        c.specs?.ncapRating !== null && c.specs?.ncapRating !== undefined
          ? `${c.specs.ncapRating}/5 ⭐ (${c.specs.ncapSource ?? "NCAP"})`
          : "Not tested / Not available"
      ),
      higherIsBetter: true,
    },
    {
      key: "warranty",
      label: "Warranty",
      values: cars.map((c) =>
        c.specs?.warrantyYears
          ? `${c.specs.warrantyYears} years / ${c.specs.warrantyKm ? c.specs.warrantyKm.toLocaleString() + " km" : "unlimited km"}`
          : "Not available"
      ),
    },
    {
      key: "topSpeed",
      label: "Top Speed",
      values: cars.map((c) => fmt(c.specs?.topSpeedKmph, " km/h")),
      higherIsBetter: true,
    },
    {
      key: "0to100",
      label: "0–100 km/h",
      values: cars.map((c) => fmt(c.specs?.zeroToHundredSec, " sec")),
      lowerIsBetter: true,
    },
  ];

  // Only include fields where at least one car has a non-"Not available" / "Not applicable" value
  return fields.filter((f) =>
    f.values.some(
      (v) => v !== "Not available" && v !== "Not applicable" && v !== "Not tested / Not available"
    )
  );
}

// Main comparison function
export async function compareCars(ids: string[]): Promise<ComparisonData | null> {
  if (ids.length < 2) return null;

  const cars = await getCarsByIds(ids);
  if (cars.length < 2) return null;

  return {
    cars: cars.map(carToSummary),
    fields: buildComparisonFields(cars),
    summary: generateSummary(cars),
  };
}
