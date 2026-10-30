/**
 * Admin Recommendation Analytics Page Component
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { adminService } from "../services/adminService.js";

export async function renderAdminAnalyticsPage() {
  const analytics = await adminService.getAnalytics();

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/admin/analytics")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "Recommendation Analytics & Market Demand",
          subtitle: "Granular breakdown of user search vectors, budget elasticity, and powertrain choices"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <!-- Top Row: Body Type & Budget Distribution -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Body Type Share -->
            <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  ${Icons.car("w-5 h-5 text-cyan-400")}
                  <span>Body Style Distribution</span>
                </h3>
                <span class="text-xs text-slate-400">Total 38,450 queries</span>
              </div>

              <div class="space-y-4 pt-2">
                ${analytics.popularBodyTypes
                  .map(
                    (bt) => `
                  <div>
                    <div class="flex items-center justify-between text-xs mb-1.5 font-semibold">
                      <span class="text-white">${bt.type}</span>
                      <span class="text-cyan-400 font-mono">${bt.percentage}%</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div class="h-full bg-cyan-400 rounded-full" style="width: ${bt.percentage}%;"></div>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- Budget Brackets -->
            <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  ${Icons.gauge("w-5 h-5 text-amber-400")}
                  <span>Budget Elasticity Tiers</span>
                </h3>
                <span class="text-xs text-slate-400 font-mono">INR On-Road</span>
              </div>

              <div class="space-y-4 pt-2">
                ${analytics.budgetDistribution
                  .map(
                    (bg) => `
                  <div>
                    <div class="flex items-center justify-between text-xs mb-1.5 font-semibold">
                      <span class="text-white">${bg.bracket}</span>
                      <span class="text-amber-400 font-mono">${bg.percentage}%</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div class="h-full bg-amber-400 rounded-full" style="width: ${bg.percentage}%;"></div>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>

          <!-- Bottom: Monthly Volume Trends Chart Visual -->
          <div class="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white tracking-tight">Monthly Advisory Volume Growth</h3>
                <p class="text-xs text-slate-400">Trend of completed AI recommendation sessions vs new users</p>
              </div>
              <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                +168% 6-Month Growth
              </span>
            </div>

            <!-- Simulated SVG Bar Chart -->
            <div class="h-64 flex items-end justify-between gap-4 pt-8 px-4 border-b border-slate-800">
              ${analytics.monthlyTrend
                .map((m) => {
                  const barHeight = Math.round((m.recommendations / 8000) * 100);
                  return `
                  <div class="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div class="text-[11px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${m.recommendations.toLocaleString()}
                    </div>
                    <div
                      class="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-blue-600 via-indigo-600 to-cyan-400 group-hover:brightness-125 transition-all duration-300"
                      style="height: ${barHeight}%;"
                    ></div>
                    <span class="text-xs font-bold text-slate-400 font-mono mt-2">${m.month}</span>
                  </div>
                `;
                })
                .join("")}
            </div>
          </div>
        </main>
      </div>

      ${renderMobileNav("#/admin/analytics")}
    </div>
  `;
}
