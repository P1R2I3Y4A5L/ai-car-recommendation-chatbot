/**
 * Admin Dashboard Page Component (Phase 1 Foundation)
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { renderDashboardCard } from "../components/dashboard/DashboardCard.js";
import { adminService } from "../services/adminService.js";

export async function renderAdminDashboardPage() {
  const stats = await adminService.getDashboardStats();

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/admin")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "Admin Executive Center",
          subtitle: "Platform performance, recommendation volume, and fleet telemetry (Foundation)"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <!-- Banner -->
          <div class="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex items-center justify-between shadow-xl">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Phase 1 Admin Architecture</span>
              </div>
              <h2 class="text-xl font-extrabold text-white">Automotive Fleet & Recommendation Telemetry</h2>
              <p class="text-xs text-slate-400">Mock administrative foundation designed for direct API hookup in Phase 2.</p>
            </div>

            <div class="flex items-center gap-3">
              <a href="#/admin/cars" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors">
                Manage Fleet Cars
              </a>
            </div>
          </div>

          <!-- Stat Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            ${renderDashboardCard({
              title: "Total Registered Users",
              value: stats.totalUsers.toLocaleString(),
              change: "+12.4%",
              changeType: "positive",
              icon: Icons.user("w-6 h-6 text-amber-400"),
              subtitle: "All-time accounts"
            })}

            ${renderDashboardCard({
              title: "Recommendations Generated",
              value: stats.totalRecommendations.toLocaleString(),
              change: "+18.2%",
              changeType: "positive",
              icon: Icons.sparkles("w-6 h-6 text-cyan-400"),
              subtitle: "Total sessions run"
            })}

            ${renderDashboardCard({
              title: "Active Today",
              value: stats.activeUsersToday.toLocaleString(),
              change: "Peak volume",
              changeType: "positive",
              icon: Icons.dashboard("w-6 h-6 text-emerald-400"),
              subtitle: "Concurrent sessions"
            })}

            ${renderDashboardCard({
              title: "Catalog Fleet Size",
              value: `${stats.totalCatalogCars} Models`,
              change: "Verified OEM",
              changeType: "neutral",
              icon: Icons.car("w-6 h-6 text-blue-400"),
              subtitle: "Live in database"
            })}
          </div>

          <!-- Two-Col Analytics & Activity -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Brand Popularity Progress Bars -->
            <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
              <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <h3 class="text-base font-bold text-white tracking-tight">Most In-Demand Manufacturers</h3>
                <a href="#/admin/analytics" class="text-xs text-amber-400 font-semibold hover:underline">Full Analytics →</a>
              </div>

              <div class="space-y-4">
                ${stats.popularBrands
                  .map(
                    (b) => `
                  <div>
                    <div class="flex items-center justify-between text-xs mb-1">
                      <span class="font-bold text-white">${b.brand}</span>
                      <span class="text-slate-400 font-mono">${b.percentage}% (${b.count.toLocaleString()} queries)</span>
                    </div>
                    <div class="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-amber-500 to-cyan-400 rounded-full" style="width: ${b.percentage}%;"></div>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>

            <!-- Recent System Events Feed -->
            <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
              <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <h3 class="text-base font-bold text-white tracking-tight">Live Platform Activity Log</h3>
                <span class="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Streaming
                </span>
              </div>

              <div class="space-y-3.5">
                ${stats.recentEvents
                  .map(
                    (evt) => `
                  <div class="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div class="font-bold text-white">${evt.user}</div>
                      <div class="text-slate-400 text-[11px]">${evt.detail}</div>
                    </div>
                    <span class="text-slate-400 font-mono text-[10px] shrink-0">${evt.time}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </main>
      </div>

      ${renderMobileNav("#/admin")}
    </div>
  `;
}
