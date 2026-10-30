/**
 * Saved Cars (Wishlist Garage) Page Component
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { renderCarCard } from "../components/cars/CarCard.js";
import { renderEmptyState } from "../components/common/EmptyState.js";
import { carService } from "../services/carService.js";
import { store } from "../../state/store.js";

export async function renderSavedCarsPage() {
  const state = store.getState();
  const savedIds = state.savedCarIds;
  const allCars = await carService.getAllCars();
  const savedCars = allCars.filter((c) => savedIds.includes(c.id));

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/saved")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "My Saved Garage",
          subtitle: "Bookmarked automotive models for quick access and comparison"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <!-- Header Banner -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-xl">
            <div>
              <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                ${Icons.heart("w-5 h-5 text-red-400", true)}
                <span>Saved Vehicles (${savedCars.length})</span>
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">Vehicles shortlisted during your AI recommendation exploration.</p>
            </div>

            ${
              savedCars.length > 0
                ? `
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  onclick="window.addAllSavedToCompare()"
                  class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
                >
                  ${Icons.compare("w-4 h-4 text-cyan-400")}
                  <span>Compare All Saved</span>
                </button>
              </div>
            `
                : ""
            }
          </div>

          <!-- Cards Grid or Empty State -->
          ${
            savedCars.length > 0
              ? `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${savedCars
                .map((car) =>
                  renderCarCard({
                    car,
                    matchScore: car.aiMatchScore || 93,
                    showSaveButton: true
                  })
                )
                .join("")}
            </div>
          `
              : renderEmptyState({
                  title: "Your saved garage is empty",
                  description: "You haven't bookmarked any cars yet. Browse our recommendation results and tap the heart icon on any model to keep it here.",
                  actionText: "Explore Car Recommendations",
                  actionRoute: "#/results",
                  actionIcon: Icons.sparkles("w-4 h-4")
                })
          }
        </main>
      </div>

      ${renderMobileNav("#/saved")}
    </div>
  `;
}
