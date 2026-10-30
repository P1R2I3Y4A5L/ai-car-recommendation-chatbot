/**
 * Application Global Reactive Store & Event Hub
 * Provides reactive subscriptions, toast notifications, theme toggling,
 * wishlist synchronization, and comparison tray state.
 */

import { mockCurrentUser } from "../data/users.js";

const DEFAULT_STATE = {
  user: mockCurrentUser,
  isAuthenticated: true,
  theme: localStorage.getItem("agy_theme") || "dark",
  savedCarIds: JSON.parse(localStorage.getItem("agy_car_saved_ids") || "[]"),
  comparisonCarIds: JSON.parse(localStorage.getItem("agy_car_compare_ids") || "[]"),
  currentPreferences: {
    budgetMin: 1500000,
    budgetMax: 2500000,
    budgetFormatted: "₹15L – ₹25L",
    usage: "Family",
    fuelPreferences: ["Petrol", "Hybrid"],
    bodyTypes: ["SUV"],
    transmission: "Automatic",
    seatingCapacity: 5,
    brandPreferences: ["Hyundai", "Tata", "Honda"],
    priorityFeatures: ["5-Star Safety Rating", "Level 2 ADAS"]
  },
  activeRecommendations: null,
  toasts: []
};

// If savedCarIds was empty, seed with initial mock favorites
if (DEFAULT_STATE.savedCarIds.length === 0) {
  DEFAULT_STATE.savedCarIds = ["car-creta-2024", "car-xuv700-2024", "car-city-hev-2024"];
  localStorage.setItem("agy_car_saved_ids", JSON.stringify(DEFAULT_STATE.savedCarIds));
}
if (DEFAULT_STATE.comparisonCarIds.length === 0) {
  DEFAULT_STATE.comparisonCarIds = ["car-creta-2024", "car-city-hev-2024"];
  localStorage.setItem("agy_car_compare_ids", JSON.stringify(DEFAULT_STATE.comparisonCarIds));
}

class Store {
  constructor() {
    this.state = { ...DEFAULT_STATE };
    this.listeners = new Set();
    this.applyTheme(this.state.theme);
  }

  getState() {
    return this.state;
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error("Store listener error:", err);
      }
    }
  }

  // Theme Management
  toggleTheme() {
    const nextTheme = this.state.theme === "dark" ? "light" : "dark";
    this.setTheme(nextTheme);
  }

  setTheme(theme) {
    this.applyTheme(theme);
    localStorage.setItem("agy_theme", theme);
    this.setState({ theme });
    this.showToast({
      title: "Appearance Updated",
      message: `Switched to ${theme === "dark" ? "Dark" : "Light"} mode`,
      type: "info"
    });
  }

  applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }

  // Wishlist (Saved Cars)
  toggleSaveCar(carId, carTitle = "Car") {
    let saved = [...this.state.savedCarIds];
    let isSaved = false;

    if (saved.includes(carId)) {
      saved = saved.filter((id) => id !== carId);
      isSaved = false;
      this.showToast({
        title: "Removed from Saved",
        message: `${carTitle} removed from your wishlist`,
        type: "warning"
      });
    } else {
      saved.push(carId);
      isSaved = true;
      this.showToast({
        title: "Saved to Wishlist",
        message: `${carTitle} added to your saved cars`,
        type: "success"
      });
    }

    localStorage.setItem("agy_car_saved_ids", JSON.stringify(saved));
    this.setState({ savedCarIds: saved });
    return isSaved;
  }

  isCarSaved(carId) {
    return this.state.savedCarIds.includes(carId);
  }

  // Comparison Management
  toggleCompareCar(carId, carTitle = "Car") {
    let compare = [...this.state.comparisonCarIds];

    if (compare.includes(carId)) {
      compare = compare.filter((id) => id !== carId);
      this.showToast({
        title: "Removed from Compare",
        message: `${carTitle} removed from comparison tray`,
        type: "info"
      });
    } else {
      if (compare.length >= 4) {
        this.showToast({
          title: "Comparison Limit Reached",
          message: "You can compare up to 4 cars at once. Remove one to add this.",
          type: "error"
        });
        return false;
      }
      compare.push(carId);
      this.showToast({
        title: "Added to Compare",
        message: `${carTitle} added (${compare.length}/4 cars selected)`,
        type: "success"
      });
    }

    localStorage.setItem("agy_car_compare_ids", JSON.stringify(compare));
    this.setState({ comparisonCarIds: compare });
    return compare.includes(carId);
  }

  isCarInComparison(carId) {
    return this.state.comparisonCarIds.includes(carId);
  }

  clearComparison() {
    localStorage.setItem("agy_car_compare_ids", JSON.stringify([]));
    this.setState({ comparisonCarIds: [] });
    this.showToast({
      title: "Comparison Cleared",
      message: "All cars removed from comparison tray",
      type: "info"
    });
  }

  // Live Preferences
  updatePreferences(updates) {
    const merged = { ...this.state.currentPreferences, ...updates };
    this.setState({ currentPreferences: merged });
  }

  setRecommendations(result) {
    this.setState({ activeRecommendations: result });
  }

  // Toast System
  showToast({ title, message, type = "info", duration = 3500 }) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast = { id, title, message, type };
    const toasts = [...this.state.toasts, newToast];
    this.setState({ toasts });

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  removeToast(id) {
    const toasts = this.state.toasts.filter((t) => t.id !== id);
    this.setState({ toasts });
  }
}

export const store = new Store();
