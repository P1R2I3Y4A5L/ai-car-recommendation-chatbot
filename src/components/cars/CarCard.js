/**
 * Car Card Component - Premium Automotive Product Card
 * Reusable across Dashboard, Recommendation Results, Saved Cars, and Explore.
 */

import { Icons } from "../common/Icons.js";
import { renderMatchScore } from "../common/MatchScore.js";
import { store } from "../../state/store.js";

export function renderCarCard({
  car,
  matchScore = null,
  showCompareToggle = true,
  showSaveButton = true,
  customAction = null
}) {
  const isSaved = store.isCarSaved(car.id);
  const isInCompare = store.isCarInComparison(car.id);

  const fuelIcon =
    car.specs.fuelType === "Electric"
      ? Icons.zap("w-3.5 h-3.5 text-cyan-400")
      : car.specs.fuelType === "Hybrid"
      ? Icons.sparkles("w-3.5 h-3.5 text-emerald-400")
      : Icons.fuel("w-3.5 h-3.5 text-amber-400");

  return `
    <div class="group relative rounded-3xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-950/20 card-hover-fx">
      <!-- Media Header -->
      <div class="relative h-56 w-full overflow-hidden bg-slate-950">
        <img
          src="${car.primaryImage}"
          alt="${car.brand} ${car.model}"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        <!-- Top Badges & Actions -->
        <div class="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
          <div>
            ${
              matchScore !== null
                ? renderMatchScore(matchScore, "sm")
                : car.isTrending
                ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">Trending</span>`
                : `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">${car.bodyType}</span>`
            }
          </div>

          <div class="flex items-center gap-2 pointer-events-auto">
            ${
              showSaveButton
                ? `
                <button
                  type="button"
                  onclick="event.stopPropagation(); window.toggleSaveCar('${car.id}', '${car.brand} ${car.model}')"
                  class="w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all ${
                    isSaved
                      ? "bg-red-500/20 text-red-400 border border-red-500/40"
                      : "bg-slate-900/70 text-slate-300 hover:text-white border border-slate-700/50 hover:bg-slate-800"
                  }"
                  title="${isSaved ? "Remove from saved" : "Save car"}"
                >
                  ${Icons.heart("w-4 h-4", isSaved)}
                </button>
              `
                : ""
            }
          </div>
        </div>

        <!-- Bottom Media Overlay: NCAP & Fuel Type -->
        <div class="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-md text-amber-400 font-semibold">
            ${Icons.star("w-3.5 h-3.5")}
            ${car.specs.safetyRating.stars}-Star ${car.specs.safetyRating.agency.split(" ")[0]}
          </span>
          <span class="text-[11px] font-mono font-medium text-slate-300 px-2 py-0.5 rounded-lg bg-slate-950/60 backdrop-blur-md">
            ${car.year} Model
          </span>
        </div>
      </div>

      <!-- Card Content -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Title & Price -->
          <div class="flex items-start justify-between gap-3 mb-2">
            <div>
              <div class="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-0.5">${car.brand}</div>
              <h3 class="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                <a href="#/car/${car.id}">${car.model}</a>
              </h3>
              <p class="text-xs text-slate-400 truncate max-w-[200px]">${car.variant}</p>
            </div>
            <div class="text-right">
              <div class="text-base font-extrabold text-white font-mono tracking-tight">${car.priceFormatted}</div>
              <div class="text-[10px] text-slate-400 font-medium">Ex-Showroom</div>
            </div>
          </div>

          <!-- Specs Matrix -->
          <div class="grid grid-cols-2 gap-2 my-4 p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <div class="flex items-center gap-2 text-slate-300">
              <span class="shrink-0">${fuelIcon}</span>
              <span class="truncate">${car.specs.fuelType}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <span class="shrink-0 text-slate-400">${Icons.transmission("w-3.5 h-3.5")}</span>
              <span class="truncate">${car.specs.transmission}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <span class="shrink-0 text-emerald-400">${Icons.gauge("w-3.5 h-3.5")}</span>
              <span class="truncate">${car.specs.mileage}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-300">
              <span class="shrink-0 text-slate-400">${Icons.seat("w-3.5 h-3.5")}</span>
              <span class="truncate">${car.specs.seating} Seater</span>
            </div>
          </div>

          <!-- Key Feature Tagline -->
          <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            ${car.overview}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="pt-3 border-t border-slate-800/80 flex items-center gap-2">
          ${
            showCompareToggle
              ? `
              <button
                type="button"
                onclick="window.toggleCompareCar('${car.id}', '${car.brand} ${car.model}')"
                class="flex-1 py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isInCompare
                    ? "bg-blue-600/20 text-cyan-300 border-cyan-500/40"
                    : "border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800"
                }"
              >
                ${Icons.compare("w-3.5 h-3.5")}
                <span>${isInCompare ? "Comparing" : "Compare"}</span>
              </button>
            `
              : ""
          }

          <a
            href="#/car/${car.id}"
            class="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 hover:border-slate-600 text-xs font-bold text-white text-center transition-all flex items-center justify-center gap-1.5 group/link"
          >
            <span>Details</span>
            <span class="group-hover/link:translate-x-0.5 transition-transform">${Icons.arrowRight("w-3 h-3 text-cyan-400")}</span>
          </a>

          ${customAction || ""}
        </div>
      </div>
    </div>
  `;
}
