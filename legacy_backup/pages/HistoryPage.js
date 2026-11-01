/**
 * Recommendation History Page Component
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { recommendationService } from "../services/recommendationService.js";

export async function renderHistoryPage() {
  const historyItems = await recommendationService.getRecommendationHistory();

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/history")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "Recommendation History",
          subtitle: "Past automotive advisory consultations and matched shortlists"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <!-- Intro Banner -->
          <div class="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                ${Icons.history("w-5 h-5 text-cyan-400")}
                <span>Previous Advisory Sessions (${historyItems.length})</span>
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">Click any session to reload previous parameter configurations or view matching vehicles.</p>
            </div>

            <a
              href="#/chat"
              class="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5"
            >
              ${Icons.sparkles("w-4 h-4")}
              <span>Start New Consultation</span>
            </a>
          </div>

          <!-- Sessions Timeline List -->
          <div class="space-y-4">
            ${historyItems
              .map(
                (item) => `
              <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700 transition-all shadow-xl group">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <!-- Session Details -->
                  <div class="space-y-2 flex-1">
                    <div class="flex items-center gap-3">
                      <span class="text-xs font-bold text-white font-mono">${item.date} • ${item.timestamp}</span>
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        ${item.matchCount} Cars Matched
                      </span>
                    </div>

                    <h3 class="text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      Budget: ${item.budgetString} • ${item.usage}
                    </h3>

                    <p class="text-xs text-slate-400">
                      ${item.preferenceSummary}
                    </p>

                    <!-- Top Match Models Pill Tags -->
                    <div class="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      <span class="text-slate-400">Top Candidates:</span>
                      ${item.topCarNames
                        .map(
                          (name) => `
                        <span class="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-medium">
                          ${name}
                        </span>
                      `
                        )
                        .join("")}
                    </div>
                  </div>

                  <!-- Thumbnails Preview & Actions -->
                  <div class="flex items-center gap-4 shrink-0">
                    <div class="flex -space-x-4 overflow-hidden py-1">
                      ${item.topCarImages
                        .map(
                          (img) => `
                        <img src="${img}" alt="Car" class="inline-block h-12 w-16 rounded-xl object-cover ring-2 ring-slate-900" />
                      `
                        )
                        .join("")}
                    </div>

                    <a
                      href="#/results"
                      class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <span>View Results</span>
                      ${Icons.arrowRight("w-3.5 h-3.5 text-cyan-400")}
                    </a>
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </main>
      </div>

      ${renderMobileNav("#/history")}
    </div>
  `;
}
