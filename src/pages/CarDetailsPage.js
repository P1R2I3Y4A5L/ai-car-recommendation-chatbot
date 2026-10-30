/**
 * Car Details Page Component
 * Detailed automotive profile with photo gallery, AI explanation, specifications, and features.
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { renderCarSpecification } from "../components/cars/CarSpecification.js";
import { renderMatchScore } from "../components/common/MatchScore.js";
import { carService } from "../services/carService.js";
import { store } from "../state/store.js";

export async function renderCarDetailsPage(carId) {
  const state = store.getState();
  const car = await carService.getCarById(carId);

  const isSaved = store.isCarSaved(car.id);
  const isInCompare = store.isCarInComparison(car.id);
  const aiScore = car.aiMatchScore || 94;

  const galleryImages = car.gallery && car.gallery.length > 0 ? car.gallery : [car.primaryImage];

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/results")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: `${car.brand} ${car.model}`,
          subtitle: `${car.variant} • ${car.specs.fuelType} • ${car.specs.transmission}`
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <!-- Back Link & Action Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4">
            <a href="#/results" class="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
              ${Icons.arrowLeft("w-4 h-4")}
              <span>Back to Recommendation Results</span>
            </a>

            <!-- Action Buttons: Save, Compare, Start New Recommendation -->
            <div class="flex items-center gap-3">
              <button
                type="button"
                onclick="window.toggleSaveCar('${car.id}', '${car.brand} ${car.model}')"
                class="px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  isSaved
                    ? "bg-red-500/20 text-red-300 border-red-500/40"
                    : "bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800"
                }"
              >
                ${Icons.heart("w-4 h-4", isSaved)}
                <span>${isSaved ? "Saved in Garage" : "Save Car"}</span>
              </button>

              <button
                type="button"
                onclick="window.toggleCompareCar('${car.id}', '${car.brand} ${car.model}')"
                class="px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  isInCompare
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                    : "bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800"
                }"
              >
                ${Icons.compare("w-4 h-4")}
                <span>${isInCompare ? "In Comparison Tray" : "Add to Compare"}</span>
              </button>

              <a
                href="#/chat"
                class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5"
              >
                ${Icons.sparkles("w-4 h-4")}
                <span>New AI Run</span>
              </a>
            </div>
          </div>

          <!-- Hero Gallery & Primary Specs Overview -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Left 7 cols: Photo Gallery with Thumbnail Selector -->
            <div class="lg:col-span-7 space-y-4">
              <div class="rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 aspect-[16/10] relative shadow-2xl">
                <img
                  id="main-detail-photo"
                  src="${galleryImages[0]}"
                  alt="${car.brand} ${car.model}"
                  class="w-full h-full object-cover transition-opacity duration-300"
                />
                <div class="absolute top-4 left-4">
                  ${renderMatchScore(aiScore, "md")}
                </div>
              </div>

              <!-- Thumbnails -->
              <div class="flex items-center gap-3 overflow-x-auto pb-1 custom-scrollbar">
                ${galleryImages
                  .map(
                    (img, idx) => `
                  <button
                    type="button"
                    onclick="window.selectGalleryImage('${img}')"
                    class="shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 border-slate-800 hover:border-cyan-500 transition-all focus:outline-none"
                  >
                    <img src="${img}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover" />
                  </button>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- Right 5 cols: Profile Overview & Quick Specs -->
            <div class="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-6">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider">${car.brand}</span>
                  <span class="text-xs text-slate-500">•</span>
                  <span class="text-xs text-slate-400 font-mono">${car.year} Release</span>
                </div>
                <h1 class="text-3xl font-extrabold text-white tracking-tight font-heading">${car.model}</h1>
                <p class="text-sm text-slate-400 mt-0.5">${car.variant}</p>
                <div class="mt-4 flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-white font-mono">${car.priceFormatted}</span>
                  <span class="text-xs text-slate-400 font-medium">Estimated Ex-Showroom</span>
                </div>
              </div>

              <div class="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                <div class="flex items-center justify-between text-slate-300">
                  <span class="text-slate-400">Body Architecture:</span>
                  <span class="font-semibold text-white">${car.bodyType}</span>
                </div>
                <div class="flex items-center justify-between text-slate-300">
                  <span class="text-slate-400">Fuel & Powertrain:</span>
                  <span class="font-semibold text-white">${car.specs.fuelType}</span>
                </div>
                <div class="flex items-center justify-between text-slate-300">
                  <span class="text-slate-400">Transmission:</span>
                  <span class="font-semibold text-white">${car.specs.transmission}</span>
                </div>
                <div class="flex items-center justify-between text-slate-300">
                  <span class="text-slate-400">ARAI Efficiency:</span>
                  <span class="font-semibold text-emerald-400 font-mono">${car.specs.mileage}</span>
                </div>
                <div class="flex items-center justify-between text-slate-300">
                  <span class="text-slate-400">Safety Rating:</span>
                  <span class="font-semibold text-amber-400">${car.specs.safetyRating.stars}-Star (${car.specs.safetyRating.agency})</span>
                </div>
              </div>

              <p class="text-xs text-slate-300 leading-relaxed">
                ${car.overview}
              </p>
            </div>
          </div>

          <!-- "Why This Car Matches You" AI Explanation Section -->
          <div class="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                ${Icons.sparkles("w-6 h-6")}
              </div>
              <div>
                <h3 class="text-lg font-bold text-white tracking-tight">Why this car matches you</h3>
                <p class="text-xs text-slate-400">AI behavioral synthesis based on your driving profile</p>
              </div>
            </div>

            <p class="text-sm text-slate-200 leading-relaxed mb-6">
              ${car.aiMatchExplanation || `Exceptional match for your lifestyle. Engineered with a ${car.specs.safetyRating.stars}-Star certified crash safety cage, ${car.specs.fuelType} powertrain delivering ${car.specs.mileage}, and comfortable seating for ${car.specs.seating} passengers well within your target budget.`}
            </p>

            <!-- Pros & Cons Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div class="space-y-2">
                <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  ${Icons.checkCircle("w-4 h-4")}
                  <span>Key Advantages (Pros)</span>
                </div>
                <ul class="space-y-1.5 text-xs text-slate-300">
                  ${(car.pros || ["Class-leading performance and refinement", "High resale value and dependable network", "Modern active safety suite"]).map((p) => `<li class="flex items-start gap-2"><span class="text-emerald-400 shrink-0 mt-0.5">•</span><span>${p}</span></li>`).join("")}
                </ul>
              </div>

              <div class="space-y-2">
                <div class="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  ${Icons.info("w-4 h-4")}
                  <span>Trade-offs to Consider (Cons)</span>
                </div>
                <ul class="space-y-1.5 text-xs text-slate-300">
                  ${(car.cons || ["Waitlist on high demand trim packages", "Slightly firmer suspension over deep road imperfections"]).map((c) => `<li class="flex items-start gap-2"><span class="text-amber-400 shrink-0 mt-0.5">•</span><span>${c}</span></li>`).join("")}
                </ul>
              </div>
            </div>
          </div>

          <!-- Technical Specifications Table -->
          ${renderCarSpecification(car.specs)}

          <!-- Key Equipment & Smart Features Grid -->
          <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <h3 class="text-base font-bold text-white tracking-tight mb-5 flex items-center gap-2">
              ${Icons.shield("w-5 h-5 text-cyan-400")}
              <span>Connected Technology & Premium Equipment</span>
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              ${car.keyFeatures
                .map(
                  (f) => `
                <div class="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200">
                  <span class="text-cyan-400 shrink-0">${Icons.check("w-4 h-4")}</span>
                  <span class="font-medium">${f}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </main>
      </div>

      ${renderMobileNav("#/results")}
    </div>
  `;
}
