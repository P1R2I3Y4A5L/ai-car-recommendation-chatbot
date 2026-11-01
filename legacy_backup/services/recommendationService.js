/**
 * Recommendation Service - AI Simulation & Engine Abstraction
 * Generates transparent multi-dimensional car recommendations.
 * Ready for replacement by real AI recommendation API (Phase 5).
 */

import { mockCars } from "../data/cars.js";
import { mockHistoryItems } from "../data/history.js";

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const recommendationService = {
  /**
   * Evaluates user preferences against the car catalog
   * and computes AI match score + qualitative rationale
   */
  async generateRecommendations(preferences = {}) {
    await delay(400); // simulate AI scoring latency

    const {
      budgetMin = 0,
      budgetMax = 10000000,
      usage = "Mixed",
      fuelPreferences = [],
      bodyTypes = [],
      transmission = "Any",
      seatingCapacity = 5,
      priorityFeatures = [],
      brandPreferences = []
    } = preferences;

    const scoredCars = mockCars.map((car) => {
      let score = 50; // base score

      // 1. Budget Fit (Max 25 pts)
      const carPrice = car.price;
      if (carPrice >= budgetMin && carPrice <= budgetMax) {
        score += 25;
      } else if (carPrice < budgetMin) {
        // Below budget is generally good
        const diff = (budgetMin - carPrice) / budgetMin;
        score += Math.max(12, Math.round(25 - diff * 15));
      } else {
        // Above budget incurs penalty
        const diff = (carPrice - budgetMax) / budgetMax;
        score -= Math.min(30, Math.round(diff * 40));
      }

      // 2. Fuel Type Match (Max 15 pts)
      if (fuelPreferences.length > 0) {
        if (fuelPreferences.some((f) => f.toLowerCase() === car.specs.fuelType.toLowerCase())) {
          score += 15;
        } else {
          score -= 5;
        }
      } else {
        score += 10;
      }

      // 3. Body Type Match (Max 15 pts)
      if (bodyTypes.length > 0) {
        if (bodyTypes.some((b) => b.toLowerCase() === car.bodyType.toLowerCase())) {
          score += 15;
        } else {
          score -= 5;
        }
      } else {
        score += 10;
      }

      // 4. Seating Match (Max 10 pts)
      if (seatingCapacity) {
        if (car.specs.seating >= seatingCapacity) {
          score += 10;
        } else {
          score -= 15;
        }
      }

      // 5. Transmission Match (Max 10 pts)
      if (transmission && transmission !== "Any") {
        if (car.specs.transmission.toLowerCase() === transmission.toLowerCase()) {
          score += 10;
        } else {
          score -= 8;
        }
      } else {
        score += 8;
      }

      // 6. Usage & Lifestyle Fit (Max 15 pts)
      if (usage === "Daily commute") {
        if (car.specs.fuelType === "Electric" || car.specs.fuelType === "Hybrid" || parseFloat(car.specs.mileage) >= 20) {
          score += 15;
        } else {
          score += 6;
        }
      } else if (usage === "Family") {
        if (car.specs.safetyRating.stars === 5 && (car.specs.seating >= 5 || car.specs.bootSpace)) {
          score += 15;
        } else {
          score += 7;
        }
      } else if (usage === "Long-distance travel") {
        if (car.specs.safetyRating.stars === 5 && parseFloat(car.specs.power) >= 140) {
          score += 15;
        } else {
          score += 8;
        }
      } else if (usage === "Off-road") {
        if (parseFloat(car.specs.groundClearance) >= 190) {
          score += 15;
        } else {
          score -= 10;
        }
      } else {
        score += 10;
      }

      // 7. Priority Feature Match (Max 10 pts)
      let featureMatchCount = 0;
      if (priorityFeatures.length > 0) {
        priorityFeatures.forEach((feat) => {
          const hasFeat = car.keyFeatures.some((kf) =>
            kf.toLowerCase().includes(feat.toLowerCase())
          );
          if (hasFeat) featureMatchCount++;
        });
        score += Math.min(10, featureMatchCount * 4);
      }

      // Clamp score between 62% and 98%
      const finalScore = Math.max(62, Math.min(98, score));

      // Compose qualitative explanation
      let rationale = "";
      if (finalScore >= 90) {
        rationale = `Exceptional match for your ${usage.toLowerCase()} profile. With a ${car.specs.safetyRating.stars}-Star safety rating, ${car.specs.fuelType} efficiency (${car.specs.mileage}), and ${car.specs.transmission} transmission, it precisely aligns with your ${car.priceFormatted} target budget.`;
      } else if (finalScore >= 80) {
        rationale = `High alignment with your preferences. Offers ${car.bodyType} comfort, spacious seating for ${car.specs.seating}, and reliable ${car.specs.fuelType} performance well within budget bounds.`;
      } else {
        rationale = `A competitive alternative offering strong engineering fundamentals, high ground clearance, and proven reliability for ${usage.toLowerCase()} duty.`;
      }

      return {
        car,
        matchScore: finalScore,
        breakdown: {
          budgetAlignment: Math.min(100, Math.round(finalScore * 0.98 + (carPrice <= budgetMax ? 6 : -8))),
          efficiencyScore: car.specs.fuelType === "Electric" || car.specs.fuelType === "Hybrid" ? 96 : 84,
          featureScore: Math.min(98, 75 + featureMatchCount * 8),
          safetyScore: car.specs.safetyRating.stars === 5 ? 98 : 78,
          lifestyleFit: Math.min(96, finalScore - 2 + Math.floor(Math.random() * 5))
        },
        aiExplanation: rationale,
        keyHighlights: car.keyFeatures.slice(0, 3)
      };
    });

    // Sort by matchScore descending
    scoredCars.sort((a, b) => b.matchScore - a.matchScore);

    return {
      id: `rec-session-${Date.now()}`,
      createdAt: new Date().toISOString(),
      preferences,
      totalMatches: scoredCars.length,
      items: scoredCars,
      summaryText: `Based on your ${preferences.usage || "driving"} requirements, ${preferences.budgetFormatted || "specified budget"}, and desired ${preferences.fuelPreferences?.join("/") || "powertrain"}, we identified ${scoredCars.length} high-fit vehicles.`
    };
  },

  /**
   * Fetch past recommendation sessions for History page
   */
  async getRecommendationHistory() {
    await delay(120);
    return [...mockHistoryItems];
  },

  /**
   * Retrieve a previous session by ID
   */
  async getRecommendationById(id) {
    await delay(150);
    return mockHistoryItems.find((h) => h.id === id) || mockHistoryItems[0];
  }
};
