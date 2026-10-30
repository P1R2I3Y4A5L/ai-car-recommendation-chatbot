/**
 * Live Preference Summary Sidebar Component
 * Displays real-time parsed parameters, profile match readiness, and trigger CTA.
 */

import { Icons } from "../common/Icons.js";

export function renderPreferenceSidebar(preferences = {}) {
  // Calculate readiness meter percentage
  const fields = [
    preferences.budgetFormatted,
    preferences.usage,
    preferences.fuelPreferences?.length,
    preferences.bodyTypes?.length,
    preferences.transmission,
    preferences.seatingCapacity,
    preferences.priorityFeatures?.length
  ];

  const completedCount = fields.filter(Boolean).length;
  const readinessPercent = Math.min(100, Math.round((completedCount / 7) * 100));

  let readinessBadge = "Collecting Needs...";
  let readinessColor = "text-amber-400 border-amber-500/30 bg-amber-500/10";
  if (readinessPercent >= 70) {
    readinessBadge = "Optimal Match Ready";
    readinessColor = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
  } else if (readinessPercent >= 40) {
    readinessBadge = "Sufficient to Recommend";
    readinessColor = "text-cyan-400 border-cyan-500/30 bg-cyan-500/10";
  }

  return `
    <aside class="w-full lg:w-80 shrink-0 border-l border-slate-800 bg-slate-950/70 backdrop-blur-xl p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar">
      <div>
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div class="flex items-center gap-2">
            ${Icons.sparkles("w-5 h-5 text-cyan-400")}
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">Live Profile Vector</h3>
          </div>
          <button
            onclick="window.resetChatPreferences()"
            class="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Reset
          </button>
        </div>

        <!-- AI Readiness Meter Card -->
        <div class="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 mb-6 shadow-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-slate-300">Match Confidence</span>
            <span class="text-sm font-extrabold text-white font-mono">${readinessPercent}%</span>
          </div>

          <!-- Progress Bar -->
          <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
            <div
              class="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-500 rounded-full"
              style="width: ${readinessPercent}%;"
            ></div>
          </div>

          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${readinessColor}">
            <span class="w-1.5 h-1.5 rounded-full ${readinessPercent >= 70 ? "bg-emerald-400" : "bg-cyan-400"} animate-pulse"></span>
            <span>${readinessBadge}</span>
          </div>
        </div>

        <!-- Preference Key-Value Matrix -->
        <div class="space-y-3">
          <!-- Budget -->
          <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target Budget</div>
            <div class="text-sm font-bold text-white flex items-center justify-between">
              <span>${preferences.budgetFormatted || "Not specified yet"}</span>
              <span class="text-cyan-400 text-xs">${preferences.budgetFormatted ? "✓" : "..."}</span>
            </div>
          </div>

          <!-- Primary Usage -->
          <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Driving Lifestyle</div>
            <div class="text-sm font-bold text-white flex items-center justify-between">
              <span>${preferences.usage || "Flexible"}</span>
              <span class="text-cyan-400 text-xs">${preferences.usage ? "✓" : "..."}</span>
            </div>
          </div>

          <!-- Fuel Preference -->
          <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Fuel / Powertrain</div>
            <div class="text-sm font-bold text-white flex items-center justify-between">
              <span>${preferences.fuelPreferences?.join(", ") || "Open to all"}</span>
              <span class="text-cyan-400 text-xs">${preferences.fuelPreferences?.length ? "✓" : "..."}</span>
            </div>
          </div>

          <!-- Body Style -->
          <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Body Style</div>
            <div class="text-sm font-bold text-white flex items-center justify-between">
              <span>${preferences.bodyTypes?.join(", ") || "Any Body Type"}</span>
              <span class="text-cyan-400 text-xs">${preferences.bodyTypes?.length ? "✓" : "..."}</span>
            </div>
          </div>

          <!-- Transmission & Seating -->
          <div class="grid grid-cols-2 gap-2">
            <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Gearbox</div>
              <div class="text-xs font-bold text-white">${preferences.transmission || "Automatic/Any"}</div>
            </div>
            <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Capacity</div>
              <div class="text-xs font-bold text-white">${preferences.seatingCapacity ? `${preferences.seatingCapacity} Seater` : "5 Seater"}</div>
            </div>
          </div>

          <!-- Priority Features -->
          <div class="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Priority Features</div>
            <div class="flex flex-wrap gap-1">
              ${
                preferences.priorityFeatures && preferences.priorityFeatures.length > 0
                  ? preferences.priorityFeatures
                      .map(
                        (f) => `
                    <span class="px-2 py-0.5 rounded-lg bg-blue-950/60 border border-blue-800/50 text-[11px] text-cyan-300 font-medium">
                      ${f}
                    </span>
                  `
                      )
                      .join("")
                  : `<span class="text-xs text-slate-400">None selected</span>`
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="pt-6 border-t border-slate-800 mt-6 space-y-2.5">
        <button
          type="button"
          onclick="window.executeRecommendationWithLiveVector()"
          class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          ${Icons.sparkles("w-4 h-4")}
          <span>Generate Recommendations</span>
        </button>

        <p class="text-center text-[10px] text-slate-400">
          Ranked using multi-parameter AI fit index
        </p>
      </div>
    </aside>
  `;
}
