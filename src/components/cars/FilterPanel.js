/**
 * Catalog & Results Filter Panel Component
 * Multi-criteria automotive filters (Budget, Brand, Fuel, Body Type, Transmission, Seating, Safety)
 */

import { Icons } from "../common/Icons.js";

export function renderFilterPanel(activeFilters = {}, catalogOptions = {}) {
  const brands = catalogOptions.brands || ["Hyundai", "Tata", "Mahindra", "Honda", "Skoda", "Toyota", "BMW", "Kia", "Mercedes-Benz"];
  const bodyTypes = catalogOptions.bodyTypes || ["SUV", "Sedan", "Hatchback", "MPV", "Coupe"];
  const fuels = catalogOptions.fuels || ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];

  const currentBrand = activeFilters.brand || "all";
  const currentBody = activeFilters.bodyType || "all";
  const currentFuel = activeFilters.fuelType || "all";
  const currentTrans = activeFilters.transmission || "all";
  const currentSeating = activeFilters.seating || "all";
  const currentSafety = activeFilters.safetyRating || "all";
  const currentBudgetMax = activeFilters.budgetMax || 7000000;

  return `
    <aside class="w-full lg:w-72 shrink-0 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl h-fit space-y-6">
      <!-- Filter Header -->
      <div class="flex items-center justify-between pb-4 border-b border-slate-800">
        <div class="flex items-center gap-2">
          ${Icons.filter("w-4 h-4 text-cyan-400")}
          <h3 class="text-sm font-bold text-white uppercase tracking-wider">Filter Catalog</h3>
        </div>
        <button
          onclick="window.resetCatalogFilters()"
          class="text-xs text-slate-400 hover:text-cyan-400 transition-colors font-medium"
        >
          Reset All
        </button>
      </div>

      <!-- Budget Ceiling Slider -->
      <div>
        <div class="flex items-center justify-between text-xs font-semibold mb-2">
          <label for="filter-budget" class="text-slate-300">Max Budget</label>
          <span id="budget-val-label" class="font-mono text-cyan-400">
            ${currentBudgetMax >= 7000000 ? "Any Budget" : `₹${(currentBudgetMax / 100000).toFixed(0)} Lakh`}
          </span>
        </div>
        <input
          type="range"
          id="filter-budget"
          min="600000"
          max="7000000"
          step="200000"
          value="${currentBudgetMax}"
          oninput="window.handleFilterChange('budgetMax', this.value)"
          class="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div class="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>₹6L</span>
          <span>₹25L</span>
          <span>₹70L+</span>
        </div>
      </div>

      <!-- Body Type Chips -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-2">Body Style</label>
        <div class="flex flex-wrap gap-1.5">
          <button
            type="button"
            onclick="window.handleFilterChange('bodyType', 'all')"
            class="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              currentBody === "all"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                : "bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700"
            }"
          >
            All
          </button>
          ${bodyTypes
            .map(
              (b) => `
            <button
              type="button"
              onclick="window.handleFilterChange('bodyType', '${b}')"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                currentBody.toLowerCase() === b.toLowerCase()
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                  : "bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
              }"
            >
              ${b}
            </button>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- Fuel Type -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-2">Fuel / Powertrain</label>
        <div class="flex flex-wrap gap-1.5">
          <button
            type="button"
            onclick="window.handleFilterChange('fuelType', 'all')"
            class="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              currentFuel === "all"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                : "bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700"
            }"
          >
            All
          </button>
          ${fuels
            .map(
              (f) => `
            <button
              type="button"
              onclick="window.handleFilterChange('fuelType', '${f}')"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                currentFuel.toLowerCase() === f.toLowerCase()
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                  : "bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
              }"
            >
              ${f}
            </button>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- Transmission Select -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Transmission</label>
        <select
          onchange="window.handleFilterChange('transmission', this.value)"
          class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          <option value="all" ${currentTrans === "all" ? "selected" : ""}>All Transmissions</option>
          <option value="Automatic" ${currentTrans === "Automatic" ? "selected" : ""}>Automatic (DCT / CVT / Torque Converter)</option>
          <option value="Manual" ${currentTrans === "Manual" ? "selected" : ""}>Manual Gearbox</option>
        </select>
      </div>

      <!-- Seating Capacity -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Seating Capacity</label>
        <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <button
            type="button"
            onclick="window.handleFilterChange('seating', 'all')"
            class="py-2 rounded-xl border transition-all font-semibold ${
              currentSeating === "all"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                : "bg-slate-950/60 text-slate-400 border-slate-800"
            }"
          >
            Any
          </button>
          <button
            type="button"
            onclick="window.handleFilterChange('seating', '5')"
            class="py-2 rounded-xl border transition-all font-semibold ${
              currentSeating === "5"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                : "bg-slate-950/60 text-slate-400 border-slate-800"
            }"
          >
            5 Seats
          </button>
          <button
            type="button"
            onclick="window.handleFilterChange('seating', '7')"
            class="py-2 rounded-xl border transition-all font-semibold ${
              currentSeating === "7"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                : "bg-slate-950/60 text-slate-400 border-slate-800"
            }"
          >
            7 Seats
          </button>
        </div>
      </div>

      <!-- Minimum Safety NCAP Stars -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Crash Safety</label>
        <div class="flex items-center gap-2">
          <select
            onchange="window.handleFilterChange('safetyRating', this.value)"
            class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all" ${currentSafety === "all" ? "selected" : ""}>Any Safety Rating</option>
            <option value="5" ${currentSafety === "5" ? "selected" : ""}>⭐⭐⭐⭐⭐ 5-Star Bharat / Global NCAP</option>
            <option value="4" ${currentSafety === "4" ? "selected" : ""}>⭐⭐⭐⭐ 4+ Stars NCAP</option>
          </select>
        </div>
      </div>

      <!-- Brand Filter -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Manufacturer</label>
        <select
          onchange="window.handleFilterChange('brand', this.value)"
          class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          <option value="all" ${currentBrand === "all" ? "selected" : ""}>All Brands</option>
          ${brands
            .map(
              (brand) => `
            <option value="${brand}" ${currentBrand.toLowerCase() === brand.toLowerCase() ? "selected" : ""}>${brand}</option>
          `
            )
            .join("")}
        </select>
      </div>
    </aside>
  `;
}
