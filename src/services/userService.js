/**
 * User Service - Abstraction Layer
 * Manages user profile, saved wishlist, comparison trays, and user settings.
 */

import { mockCurrentUser } from "../data/users.js";

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_SAVED_KEY = "agy_car_saved_ids";
const STORAGE_COMPARE_KEY = "agy_car_compare_ids";
const STORAGE_USER_KEY = "agy_car_user_profile";

function getLocal(key, defaultVal) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

export const userService = {
  /**
   * Fetch current user profile
   */
  async getCurrentUser() {
    await delay();
    const stored = getLocal(STORAGE_USER_KEY, mockCurrentUser);
    const savedIds = getLocal(STORAGE_SAVED_KEY, stored.savedCarIds || []);
    const compareIds = getLocal(STORAGE_COMPARE_KEY, stored.comparisonCarIds || []);
    return { ...stored, savedCarIds: savedIds, comparisonCarIds: compareIds };
  },

  /**
   * Update profile fields
   */
  async updateProfile(updates) {
    await delay(200);
    const current = await this.getCurrentUser();
    const merged = { ...current, ...updates };
    setLocal(STORAGE_USER_KEY, merged);
    return merged;
  },

  /**
   * Toggle saved car (wishlist)
   */
  async toggleSaveCar(carId) {
    await delay(80);
    let saved = getLocal(STORAGE_SAVED_KEY, mockCurrentUser.savedCarIds);
    let isSaved = false;

    if (saved.includes(carId)) {
      saved = saved.filter((id) => id !== carId);
      isSaved = false;
    } else {
      saved.push(carId);
      isSaved = true;
    }

    setLocal(STORAGE_SAVED_KEY, saved);
    return { savedCarIds: saved, isSaved };
  },

  /**
   * Get all saved car IDs
   */
  async getSavedCarIds() {
    return getLocal(STORAGE_SAVED_KEY, mockCurrentUser.savedCarIds);
  },

  /**
   * Add car to comparison tray (max 4)
   */
  async addToCompare(carId) {
    await delay(50);
    let list = getLocal(STORAGE_COMPARE_KEY, mockCurrentUser.comparisonCarIds);
    if (!list.includes(carId)) {
      if (list.length >= 4) {
        throw new Error("You can compare up to 4 cars simultaneously. Please remove one first.");
      }
      list.push(carId);
      setLocal(STORAGE_COMPARE_KEY, list);
    }
    return list;
  },

  /**
   * Remove car from comparison tray
   */
  async removeFromCompare(carId) {
    await delay(50);
    let list = getLocal(STORAGE_COMPARE_KEY, mockCurrentUser.comparisonCarIds);
    list = list.filter((id) => id !== carId);
    setLocal(STORAGE_COMPARE_KEY, list);
    return list;
  },

  /**
   * Clear comparison tray
   */
  async clearComparison() {
    setLocal(STORAGE_COMPARE_KEY, []);
    return [];
  },

  /**
   * Get comparison car IDs
   */
  async getComparisonCarIds() {
    return getLocal(STORAGE_COMPARE_KEY, mockCurrentUser.comparisonCarIds);
  }
};
