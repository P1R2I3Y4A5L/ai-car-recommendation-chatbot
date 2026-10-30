/**
 * Car Service - Abstraction Layer
 * Connects UI to car data. In Phase 2, swap mock calls with:
 * const res = await fetch('/api/cars?...'); return res.json();
 */

import { mockCars } from "../data/cars.js";

// Simulated network latency for realistic UX & skeleton testing
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const carService = {
  /**
   * Fetch all cars with optional client-side filtering and sorting
   */
  async getAllCars(filters = {}, sortBy = "match") {
    await delay();
    let results = [...mockCars];

    if (filters.brand && filters.brand !== "all") {
      results = results.filter((c) => c.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    if (filters.bodyType && filters.bodyType !== "all") {
      results = results.filter((c) => c.bodyType.toLowerCase() === filters.bodyType.toLowerCase());
    }

    if (filters.fuelType && filters.fuelType !== "all") {
      results = results.filter((c) => c.specs.fuelType.toLowerCase() === filters.fuelType.toLowerCase());
    }

    if (filters.transmission && filters.transmission !== "all") {
      results = results.filter((c) => c.specs.transmission.toLowerCase() === filters.transmission.toLowerCase());
    }

    if (filters.seating && filters.seating !== "all") {
      results = results.filter((c) => c.specs.seating === Number(filters.seating));
    }

    if (filters.budgetMax) {
      results = results.filter((c) => c.price <= Number(filters.budgetMax));
    }

    if (filters.budgetMin) {
      results = results.filter((c) => c.price >= Number(filters.budgetMin));
    }

    if (filters.safetyRating && filters.safetyRating !== "all") {
      results = results.filter((c) => c.specs.safetyRating.stars >= Number(filters.safetyRating));
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.variant.toLowerCase().includes(q) ||
          c.bodyType.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "mileage":
        results.sort((a, b) => {
          const mA = parseFloat(a.specs.mileage) || 0;
          const mB = parseFloat(b.specs.mileage) || 0;
          return mB - mA;
        });
        break;
      case "newest":
        results.sort((a, b) => b.year - a.year);
        break;
      default:
        // Default: popular / trending first
        results.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }

    return results;
  },

  /**
   * Fetch featured cars for Landing and Dashboard
   */
  async getFeaturedCars() {
    await delay(120);
    return mockCars.filter((c) => c.isPopular || c.isTrending).slice(0, 6);
  },

  /**
   * Fetch a single car by its unique ID
   */
  async getCarById(id) {
    await delay(100);
    const car = mockCars.find((c) => c.id === id);
    if (!car) {
      throw new Error(`Car with ID "${id}" was not found.`);
    }
    return car;
  },

  /**
   * Compare multiple cars side-by-side (2 to 4 cars)
   */
  async compareCars(carIds = []) {
    await delay(150);
    return mockCars.filter((c) => carIds.includes(c.id));
  },

  /**
   * Search cars with live autocompletion
   */
  async searchCars(query) {
    await delay(80);
    if (!query || query.trim().length === 0) return [];
    const q = query.toLowerCase().trim();
    return mockCars
      .filter(
        (c) =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.variant.toLowerCase().includes(q)
      )
      .slice(0, 6);
  },

  /**
   * Get distinct filter options from current catalog
   */
  async getFilterOptions() {
    await delay(50);
    const brands = [...new Set(mockCars.map((c) => c.brand))];
    const bodyTypes = [...new Set(mockCars.map((c) => c.bodyType))];
    const fuels = [...new Set(mockCars.map((c) => c.specs.fuelType))];
    return { brands, bodyTypes, fuels };
  }
};
