/**
 * Compare Cars Page Component
 * Allows comparing 2 to 4 cars side-by-side with difference highlighting.
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { renderCarComparisonMatrix } from "../components/cars/CarComparison.js";
import { renderEmptyState } from "../components/common/EmptyState.js";
import { carService } from "../services/carService.js";
import { store } from "../state/store.js";

export async function renderComparePage() {
  const state = store.getState();
  const compareCarIds = state.comparisonCarIds;
  const allCars = await carService.getAllCars();
  const selectedCars = allCars.filter((c) => compareCarIds.includes(c.id));

  // Available cars to add to empty slots
  const unselectedCars = allCars.filter((c) => !compareCarIds.includes(c.id));
  const highlightDiffs = window.isHighlightDiffsActive !== false;

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/compare")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "Vehicle Comparison Matrix",
          subtitle: "Evaluate technical specifications, safety, and price parity side-by-side"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <!-- Top Bar: Add Car Dropdown & Quick Slot Indicators -->
          <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div class="space-y-1">
              <h2 class="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                ${Icons.compare("w-5 h-5 text-cyan-400")}
                <span>Active Comparison Tray (${selectedCars.length}/4)</span>
              </h2>
              <p class="text-xs text-slate-400">Add up to 4 models from our verified catalog to compare key engineering dimensions.</p>
            </div>

            <!-- Quick Add Dropdown Selector -->
            ${
              selectedCars.length < 4
                ? `
              <div class="flex items-center gap-2 w-full sm:w-auto">
                <select
                  id="add-to-compare-select"
                  onchange="if(this.value){ window.addToCompareCar(this.value); this.value=''; }"
                  class="w-full sm:w-64 px-4 py-2.5 bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-slate-200 focus:outline-none"
                >
                  <option value="">+ Add a vehicle to compare...</option>
                  ${unselectedCars
                    .map(
                      (c) => `
                    <option value="${c.id}">${c.brand} ${c.model} (${c.priceFormatted})</option>
                  `
                    )
                    .join("")}
                </select>
              </div>
            `
                : `<span class="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-cyan-300 border border-slate-700">4 / 4 Slots Filled</span>`
            }
          </div>

          <!-- Comparison Table or Empty State -->
          ${
            selectedCars.length >= 1
              ? `
            <div class="space-y-6">
              ${renderCarComparisonMatrix({
                cars: selectedCars,
                highlightDiffs: highlightDiffs
              })}
            </div>
          `
              : renderEmptyState({
                  title: "Comparison tray is empty",
                  description: "You haven't selected any cars to compare yet. Add models from your recommendations or the catalog to view differences side-by-side.",
                  actionText: "Browse Recommended Cars",
                  actionRoute: "#/results",
                  actionIcon: Icons.sparkles("w-4 h-4")
                })
          }
        </main>
      </div>

      ${renderMobileNav("#/compare")}
    </div>
  `;
}
