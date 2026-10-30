/**
 * Recommendation Results Page Component
 * Displays ranked automotive matches, score breakdowns, comprehensive filters, and sorting.
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { renderCarCard } from "../components/cars/CarCard.js";
import { renderFilterPanel } from "../components/cars/FilterPanel.js";
import { renderEmptyState } from "../components/common/EmptyState.js";
import { recommendationService } from "../services/recommendationService.js";
import { carService } from "../services/carService.js";
import { store } from "../../state/store.js";

export async function renderResultsPage() {
  const state = store.getState();
  const preferences = state.currentPreferences;

  // Generate or retrieve current recommendations
  let recs = state.activeRecommendations;
  if (!recs) {
    recs = await recommendationService.generateRecommendations(preferences);
    store.setRecommendations(recs);
  }

  // Get active catalog filter options
  const filterOptions = await carService.getFilterOptions();

  // Apply any client-side active filters / sort on the results
  const currentFilters = window.currentResultsFilters || {};
  const currentSort = window.currentResultsSort || "match";

  let displayItems = [...recs.items];

  // Apply filters
  if (currentFilters.bodyType && currentFilters.bodyType !== "all") {
    displayItems = displayItems.filter(
      (item) => item.car.bodyType.toLowerCase() === currentFilters.bodyType.toLowerCase()
    );
  }
  if (currentFilters.fuelType && currentFilters.fuelType !== "all") {
    displayItems = displayItems.filter(
      (item) => item.car.specs.fuelType.toLowerCase() === currentFilters.fuelType.toLowerCase()
    );
  }
  if (currentFilters.transmission && currentFilters.transmission !== "all") {
    displayItems = displayItems.filter(
      (item) => item.car.specs.transmission.toLowerCase() === currentFilters.transmission.toLowerCase()
    );
  }
  if (currentFilters.seating && currentFilters.seating !== "all") {
    displayItems = displayItems.filter(
      (item) => item.car.specs.seating === Number(currentFilters.seating)
    );
  }
  if (currentFilters.budgetMax) {
    displayItems = displayItems.filter((item) => item.car.price <= Number(currentFilters.budgetMax));
  }
  if (currentFilters.brand && currentFilters.brand !== "all") {
    displayItems = displayItems.filter(
      (item) => item.car.brand.toLowerCase() === currentFilters.brand.toLowerCase()
    );
  }

  // Apply Sorting
  if (currentSort === "price-asc") {
    displayItems.sort((a, b) => a.car.price - b.car.price);
  } else if (currentSort === "price-desc") {
    displayItems.sort((a, b) => b.car.price - a.car.price);
  } else if (currentSort === "mileage") {
    displayItems.sort((a, b) => parseFloat(b.car.specs.mileage) - parseFloat(a.car.specs.mileage));
  } else if (currentSort === "newest") {
    displayItems.sort((a, b) => b.car.year - a.car.year);
  } else {
    // Default Best Match
    displayItems.sort((a, b) => b.matchScore - a.matchScore);
  }

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/results")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "Cars Recommended For You",
          subtitle: "Precision AI compatibility scores and multi-attribute evaluation"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <!-- AI Executive Match Banner -->
          <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-cyan-950/40 border border-cyan-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div class="space-y-3 max-w-3xl">
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                    ${Icons.sparkles("w-3.5 h-3.5 text-cyan-400")}
                    <span>Recommendation Session Active</span>
                  </span>
                  <span class="text-xs text-slate-400 font-mono">${displayItems.length} matches found</span>
                </div>

                <h2 class="text-2xl font-extrabold text-white tracking-tight font-heading">
                  Top Recommended Cars For You
                </h2>
                <p class="text-sm text-slate-300 leading-relaxed">
                  ${recs.summaryText}
                </p>

                <!-- Active Preference Badges -->
                <div class="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span class="text-slate-400 font-semibold">Configured Parameters:</span>
                  <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                    Budget: <strong class="text-white">${preferences.budgetFormatted || "Any"}</strong>
                  </span>
                  <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                    Usage: <strong class="text-white">${preferences.usage || "Mixed"}</strong>
                  </span>
                  <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                    Body: <strong class="text-white">${preferences.bodyTypes?.join("/") || "All"}</strong>
                  </span>
                  <span class="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200">
                    Fuel: <strong class="text-white">${preferences.fuelPreferences?.join("/") || "All"}</strong>
                  </span>
                </div>
              </div>

              <!-- Re-run / Refine CTA -->
              <div class="shrink-0 flex sm:flex-col gap-2 w-full sm:w-auto">
                <a
                  href="#/chat"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
                >
                  ${Icons.bot("w-4 h-4")}
                  <span>Refine in Chat</span>
                </a>
                <a
                  href="#/compare"
                  class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
                >
                  ${Icons.compare("w-4 h-4 text-cyan-400")}
                  <span>View Compare Tray</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Controls Bar: Results Count & Sorting -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <div class="text-xs text-slate-300 font-semibold">
              Showing <span class="text-white font-bold">${displayItems.length}</span> verified automotive models
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto">
              <label for="results-sort" class="text-xs text-slate-400 whitespace-nowrap">Sort By:</label>
              <select
                id="results-sort"
                onchange="window.handleSortChange(this.value)"
                class="w-full sm:w-56 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="match" ${currentSort === "match" ? "selected" : ""}>AI Compatibility (Best Match)</option>
                <option value="price-asc" ${currentSort === "price-asc" ? "selected" : ""}>Price: Low to High</option>
                <option value="price-desc" ${currentSort === "price-desc" ? "selected" : ""}>Price: High to Low</option>
                <option value="mileage" ${currentSort === "mileage" ? "selected" : ""}>Fuel Efficiency / Range</option>
                <option value="newest" ${currentSort === "newest" ? "selected" : ""}>Newest Model Year</option>
              </select>
            </div>
          </div>

          <!-- Main Layout: Filters Sidebar on Left, Cards Grid on Right -->
          <div class="flex flex-col lg:flex-row gap-8 items-start">
            <!-- Left Filter Panel -->
            ${renderFilterPanel(currentFilters, filterOptions)}

            <!-- Right Results Car Grid -->
            <div class="flex-1 w-full">
              ${
                displayItems.length > 0
                  ? `
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  ${displayItems
                    .map((item) =>
                      renderCarCard({
                        car: item.car,
                        matchScore: item.matchScore
                      })
                    )
                    .join("")}
                </div>
              `
                  : renderEmptyState({
                      title: "No cars match the active filters",
                      description: "Try resetting your filter parameters or start a new conversation with our AI advisor.",
                      actionText: "Reset Catalog Filters",
                      actionRoute: "#/results",
                      actionIcon: Icons.filter("w-4 h-4")
                    })
              }
            </div>
          </div>
        </main>
      </div>

      ${renderMobileNav("#/results")}
    </div>
  `;
}
