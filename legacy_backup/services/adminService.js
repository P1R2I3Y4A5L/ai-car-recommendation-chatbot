/**
 * Admin Service - Management & Analytics Abstraction
 * Supports Phase 1 UI-only Admin Dashboard & Car Management.
 */

import { mockAdminStats } from "../data/admin.js";
import { mockCars } from "../data/cars.js";
import { mockUserList } from "../data/users.js";

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

let activeCarsCatalog = [...mockCars];
let activeUsersList = [...mockUserList];

export const adminService = {
  /**
   * Fetch overview analytics KPIs and trend charts
   */
  async getDashboardStats() {
    await delay(180);
    return {
      ...mockAdminStats,
      totalCatalogCars: activeCarsCatalog.length
    };
  },

  /**
   * Fetch full catalog for Car Management table
   */
  async getCarList(search = "", bodyType = "all") {
    await delay(150);
    let list = [...activeCarsCatalog];

    if (bodyType !== "all") {
      list = list.filter((c) => c.bodyType.toLowerCase() === bodyType.toLowerCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.variant.toLowerCase().includes(q)
      );
    }

    return list;
  },

  /**
   * Add new vehicle to catalog
   */
  async addCar(carData) {
    await delay(250);
    const newCar = {
      ...carData,
      id: `car-${Date.now()}`,
      isPopular: false,
      isTrending: true
    };
    activeCarsCatalog.unshift(newCar);
    return newCar;
  },

  /**
   * Update existing car
   */
  async updateCar(id, updates) {
    await delay(200);
    const idx = activeCarsCatalog.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Car not found in catalog");
    activeCarsCatalog[idx] = { ...activeCarsCatalog[idx], ...updates };
    return activeCarsCatalog[idx];
  },

  /**
   * Delete vehicle from catalog
   */
  async deleteCar(id) {
    await delay(200);
    activeCarsCatalog = activeCarsCatalog.filter((c) => c.id !== id);
    return { success: true, deletedId: id };
  },

  /**
   * Fetch registered users list
   */
  async getUsersList(search = "") {
    await delay(150);
    let list = [...activeUsersList];
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.location.toLowerCase().includes(q)
      );
    }
    return list;
  },

  /**
   * Get recommendation analytics distributions
   */
  async getAnalytics() {
    await delay(150);
    return {
      popularBrands: mockAdminStats.popularBrands,
      popularBodyTypes: mockAdminStats.popularBodyTypes,
      budgetDistribution: mockAdminStats.budgetDistribution,
      monthlyTrend: mockAdminStats.monthlyTrend
    };
  }
};
