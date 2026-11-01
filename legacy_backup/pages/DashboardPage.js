/**
 * User Dashboard Page Component
 * SaaS Dashboard with statistics, main CTA, recent recommendations, and activity.
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { renderDashboardCard } from "../components/dashboard/DashboardCard.js";
import { renderRecentActivity } from "../components/dashboard/RecentActivity.js";
import { renderCarCard } from "../components/cars/CarCard.js";
import { carService } from "../services/carService.js";
import { store } from "../state/store.js";

export async function renderDashboardPage() {
  const state = store.getState();
  const savedCount = state.savedCarIds.length;
  const compareCount = state.comparisonCarIds.length;
  const featuredCars = await carService.getFeaturedCars();
  const allCars = await carService.getAllCars();

  const savedCarObjects = allCars.filter((c) => state.savedCarIds.includes(c.id));

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <!-- SaaS Sidebar -->
      ${renderSidebar("#/dashboard")}

      <!-- Main Dashboard Content Area -->
      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-20 lg:pb-12">
        ${renderHeader({ subtitle: "Your personal automotive command center & match metrics" })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <!-- Main Hero Banner CTA Card: "Find Your Perfect Car" -->
          <div class="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-slate-900 border border-blue-500/30 overflow-hidden shadow-2xl group">
            <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-cyan-500/15 blur-[100px] rounded-full pointer-events-none"></div>

            <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div class="space-y-3 max-w-2xl">
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  ${Icons.sparkles("w-3.5 h-3.5 text-cyan-400")}
                  <span>AI Recommendation Engine v2.4</span>
                </div>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                  Find Your Perfect Car
                </h2>
                <p class="text-sm text-slate-300 leading-relaxed">
                  Ready to upgrade or buy your first car? Chat with our conversational AI advisor to receive customized matches ranked by safety, efficiency, and real-world value.
                </p>
              </div>

              <div class="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href="#/chat"
                  class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 active:scale-95 transition-all"
                >
                  ${Icons.bot("w-5 h-5")}
                  <span>Start AI Car Finder</span>
                </a>
                <a
                  href="#/results"
                  class="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold transition-all"
                >
                  <span>Explore Results</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Statistics Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            ${renderDashboardCard({
              title: "Cars Recommended",
              value: "14",
              change: "+4 this month",
              changeType: "positive",
              icon: Icons.sparkles("w-6 h-6 text-cyan-400"),
              subtitle: "AI match runs",
              route: "#/results"
            })}

            ${renderDashboardCard({
              title: "Saved Wishlist",
              value: String(savedCount),
              change: savedCount > 0 ? `${savedCount} active` : "Empty",
              changeType: savedCount > 0 ? "positive" : "neutral",
              icon: Icons.heart("w-6 h-6 text-red-400", savedCount > 0),
              subtitle: "In your garage",
              route: "#/saved"
            })}

            ${renderDashboardCard({
              title: "Comparisons",
              value: `${compareCount} / 4`,
              change: compareCount > 0 ? "Ready to view" : "0 selected",
              changeType: compareCount > 0 ? "positive" : "neutral",
              icon: Icons.compare("w-6 h-6 text-blue-400"),
              subtitle: "Side-by-side tray",
              route: "#/compare"
            })}

            ${renderDashboardCard({
              title: "Recent Searches",
              value: "6",
              change: "Active history",
              changeType: "neutral",
              icon: Icons.history("w-6 h-6 text-amber-400"),
              subtitle: "Saved queries",
              route: "#/history"
            })}
          </div>

          <!-- Recent AI Recommendations Section -->
          <section class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-bold text-white tracking-tight font-heading">
                  Top Recommended Cars For You
                </h3>
                <p class="text-xs text-slate-400">Calculated from your current family & budget preference vector</p>
              </div>
              <a href="#/results" class="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                <span>View Full Results</span>
                ${Icons.arrowRight("w-3.5 h-3.5")}
              </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${featuredCars
                .slice(0, 3)
                .map((car, idx) =>
                  renderCarCard({
                    car,
                    matchScore: 96 - idx * 3
                  })
                )
                .join("")}
            </div>
          </section>

          <!-- Two-Column Layout: Saved Cars Preview & Recent Activity / Insights -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left: Saved Cars Preview -->
            <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                  <div class="flex items-center gap-2">
                    ${Icons.heart("w-5 h-5 text-red-400", true)}
                    <h3 class="text-base font-bold text-white tracking-tight">Saved Garage Preview</h3>
                  </div>
                  <a href="#/saved" class="text-xs text-cyan-400 hover:text-cyan-300 font-semibold">Manage All (${savedCount})</a>
                </div>

                ${
                  savedCarObjects.length > 0
                    ? `
                  <div class="space-y-3">
                    ${savedCarObjects
                      .slice(0, 3)
                      .map(
                        (c) => `
                      <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-colors group">
                        <img src="${c.primaryImage}" alt="${c.model}" class="w-16 h-12 rounded-xl object-cover" />
                        <div class="flex-1 min-w-0">
                          <h4 class="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">${c.brand} ${c.model}</h4>
                          <p class="text-[11px] text-slate-400 truncate">${c.specs.fuelType} • ${c.specs.transmission}</p>
                        </div>
                        <div class="text-right">
                          <div class="text-xs font-mono font-bold text-white">${c.priceFormatted}</div>
                          <a href="#/car/${c.id}" class="text-[10px] text-cyan-400 hover:underline">View Spec</a>
                        </div>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                `
                    : `
                  <div class="p-8 text-center text-slate-400 text-xs">
                    No cars saved in your wishlist yet. Click the heart icon on any car to bookmark it here.
                  </div>
                `
                }
              </div>

              <div class="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Direct comparison available from saved list</span>
                <a href="#/compare" class="text-cyan-400 font-semibold hover:underline">Open Compare Tray →</a>
              </div>
            </div>

            <!-- Right: Recent Activity & Recommendation Insights -->
            <div>
              ${renderRecentActivity()}
            </div>
          </div>
        </main>
      </div>

      <!-- Mobile Navigation Drawer & Bottom Bar -->
      ${renderMobileNav("#/dashboard")}
    </div>
  `;
}
