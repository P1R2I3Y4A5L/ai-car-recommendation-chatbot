/**
 * Car Comparison Matrix Component
 * Side-by-side comparison for 2 to 4 cars with difference highlighting and mobile horizontal scroll.
 */

import { Icons } from "../common/Icons.js";
import { renderMatchScore } from "../common/MatchScore.js";

export function renderCarComparisonMatrix({ cars = [], highlightDiffs = true, onRemoveCar = "window.removeCompareCar" }) {
  if (!cars || cars.length === 0) {
    return `
      <div class="p-8 text-center text-slate-400">
        No cars selected for comparison. Add 2 to 4 cars from the catalog or recommendations.
      </div>
    `;
  }

  const fields = [
    { label: "Price (Ex-Showroom)", getVal: (c) => c.priceFormatted, key: "price" },
    { label: "AI Compatibility", getVal: (c) => c.aiMatchScore ? `${c.aiMatchScore}% Match` : "88% Match", key: "score", isScore: true },
    { label: "Powertrain / Engine", getVal: (c) => c.specs.engine, key: "engine" },
    { label: "Max Power", getVal: (c) => c.specs.power, key: "power" },
    { label: "Peak Torque", getVal: (c) => c.specs.torque, key: "torque" },
    { label: "Fuel Economy / Range", getVal: (c) => c.specs.mileage, key: "mileage" },
    { label: "Fuel Type", getVal: (c) => c.specs.fuelType, key: "fuel" },
    { label: "Transmission", getVal: (c) => c.specs.transmission, key: "transmission" },
    { label: "Seating Capacity", getVal: (c) => `${c.specs.seating} Seats`, key: "seating" },
    { label: "Boot Space", getVal: (c) => c.specs.bootSpace, key: "boot" },
    { label: "Ground Clearance", getVal: (c) => c.specs.groundClearance, key: "clearance" },
    {
      label: "Safety Rating",
      getVal: (c) => `${c.specs.safetyRating.stars}-Star (${c.specs.safetyRating.agency}) • ${c.specs.safetyRating.airbags} Airbags`,
      key: "safety"
    }
  ];

  // Helper to determine if row has differing values across selected cars
  const isRowDifferent = (field) => {
    if (cars.length < 2) return false;
    const firstVal = field.getVal(cars[0]);
    return cars.some((c) => field.getVal(c) !== firstVal);
  };

  return `
    <div class="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl backdrop-blur-xl">
      <!-- Matrix Header Controls -->
      <div class="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/90">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
          <h3 class="text-base font-bold text-white tracking-tight">Comparing ${cars.length} Vehicles</h3>
          <span class="text-xs text-slate-400">(${4 - cars.length} slots available)</span>
        </div>

        <div class="flex items-center gap-3">
          <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              id="highlight-diffs-toggle"
              ${highlightDiffs ? "checked" : ""}
              onchange="window.toggleHighlightDifferences(this.checked)"
              class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
            />
            <span>Highlight Differences</span>
          </label>

          <button onclick="window.clearAllComparisons()" class="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1">
            ${Icons.trash("w-3.5 h-3.5")}
            <span>Clear Tray</span>
          </button>
        </div>
      </div>

      <!-- Horizontal Scroll Table Container for Mobile/Tablet -->
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse min-w-[720px]">
          <!-- Sticky Top: Car Thumbnails & Header Titles -->
          <thead>
            <tr class="border-b border-slate-800 bg-slate-950/60">
              <th class="p-5 w-48 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-950/80 sticky left-0 z-10 backdrop-blur-md">
                Attributes
              </th>
              ${cars
                .map(
                  (car) => `
                <th class="p-5 w-72 align-top text-left">
                  <div class="relative group">
                    <div class="h-36 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mb-3 relative">
                      <img src="${car.primaryImage}" alt="${car.brand} ${car.model}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <button
                        onclick="${onRemoveCar}('${car.id}')"
                        class="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 hover:bg-red-500/80 text-slate-300 hover:text-white transition-colors"
                        title="Remove car from comparison"
                      >
                        ${Icons.close("w-4 h-4")}
                      </button>
                    </div>

                    <div class="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">${car.brand}</div>
                    <h4 class="text-base font-bold text-white tracking-tight leading-tight">
                      <a href="#/car/${car.id}" class="hover:text-cyan-300">${car.model}</a>
                    </h4>
                    <div class="text-xs text-slate-400 truncate mb-2">${car.variant}</div>
                    <div class="text-sm font-extrabold text-white font-mono">${car.priceFormatted}</div>
                  </div>
                </th>
              `
                )
                .join("")}
            </tr>
          </thead>

          <!-- Spec Fields Body -->
          <tbody class="divide-y divide-slate-800/60 text-sm">
            ${fields
              .map((field, rIdx) => {
                const differing = highlightDiffs && isRowDifferent(field);
                return `
                <tr class="${differing ? "bg-cyan-950/20" : rIdx % 2 === 0 ? "bg-slate-950/30" : "bg-transparent"} hover:bg-slate-800/40 transition-colors">
                  <td class="p-4 font-semibold text-slate-300 text-xs tracking-wide bg-slate-950/80 sticky left-0 z-10 backdrop-blur-md border-r border-slate-800/60">
                    <div class="flex items-center justify-between">
                      <span>${field.label}</span>
                      ${differing ? `<span class="w-1.5 h-1.5 rounded-full bg-cyan-400" title="Different between cars"></span>` : ""}
                    </div>
                  </td>
                  ${cars
                    .map((car) => {
                      const val = field.getVal(car);
                      return `
                      <td class="p-4 text-slate-200 font-medium ${differing ? "font-semibold text-white" : ""}">
                        ${
                          field.isScore
                            ? renderMatchScore(car.aiMatchScore || 88, "sm")
                            : `<span>${val}</span>`
                        }
                      </td>
                    `;
                    })
                    .join("")}
                </tr>
              `;
              })
              .join("")}

            <!-- Key Features Row -->
            <tr class="bg-slate-950/40">
              <td class="p-4 font-semibold text-slate-300 text-xs tracking-wide bg-slate-950/80 sticky left-0 z-10 backdrop-blur-md border-r border-slate-800/60 align-top">
                Key Features Checklist
              </td>
              ${cars
                .map(
                  (car) => `
                <td class="p-4 align-top">
                  <ul class="space-y-1.5 text-xs text-slate-300">
                    ${car.keyFeatures
                      .slice(0, 5)
                      .map(
                        (feat) => `
                      <li class="flex items-start gap-1.5">
                        <span class="text-emerald-400 mt-0.5 shrink-0">${Icons.check("w-3.5 h-3.5")}</span>
                        <span class="leading-snug">${feat}</span>
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </td>
              `
                )
                .join("")}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
