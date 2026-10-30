/**
 * App Sidebar Component (SaaS Dashboard & User Navigation)
 */

import { Icons } from "../common/Icons.js";
import { store } from "../../state/store.js";

export function renderSidebar(activeRoute = "#/dashboard") {
  const state = store.getState();
  const user = state.user;
  const savedCount = state.savedCarIds.length;
  const compareCount = state.comparisonCarIds.length;

  const userNavItems = [
    { label: "Dashboard", href: "#/dashboard", icon: Icons.dashboard("w-5 h-5") },
    { label: "AI Car Finder", href: "#/chat", icon: Icons.bot("w-5 h-5"), badge: "AI" },
    { label: "Recommendations", href: "#/results", icon: Icons.sparkles("w-5 h-5") },
    {
      label: "Compare Cars",
      href: "#/compare",
      icon: Icons.compare("w-5 h-5"),
      count: compareCount
    },
    {
      label: "Saved Cars",
      href: "#/saved",
      icon: Icons.heart("w-5 h-5", savedCount > 0),
      count: savedCount
    },
    { label: "Search History", href: "#/history", icon: Icons.history("w-5 h-5") },
    { label: "My Profile", href: "#/profile", icon: Icons.user("w-5 h-5") },
    { label: "Settings", href: "#/settings", icon: Icons.settings("w-5 h-5") }
  ];

  const adminNavItems = [
    { label: "Admin Overview", href: "#/admin", icon: Icons.shield("w-5 h-5") },
    { label: "Car Management", href: "#/admin/cars", icon: Icons.car("w-5 h-5") },
    { label: "User Management", href: "#/admin/users", icon: Icons.user("w-5 h-5") },
    { label: "Recommendation Analytics", href: "#/admin/analytics", icon: Icons.gauge("w-5 h-5") }
  ];

  const isAdminRoute = activeRoute.startsWith("#/admin");

  return `
    <aside class="w-64 shrink-0 hidden lg:flex flex-col border-r border-slate-800 bg-slate-950/90 backdrop-blur-xl h-screen sticky top-0 overflow-y-auto custom-scrollbar z-30">
      <!-- App Brand -->
      <div class="p-6 border-b border-slate-800/80">
        <a href="#/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
              ${Icons.car("w-5 h-5 text-cyan-400")}
            </div>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-base font-extrabold text-white tracking-tight">AutoMind</span>
              <span class="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">AI</span>
            </div>
            <p class="text-[10px] text-slate-400 font-medium">Automotive Intelligence</p>
          </div>
        </a>
      </div>

      <!-- Quick Finder Card -->
      <div class="px-4 py-4">
        <a href="#/chat" class="group flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-cyan-900/30 border border-blue-700/40 hover:border-cyan-500/60 transition-all shadow-lg shadow-blue-950/40">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              ${Icons.sparkles("w-4 h-4")}
            </div>
            <div>
              <div class="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Start AI Finder</div>
              <div class="text-[10px] text-slate-400">Chat with Advisor</div>
            </div>
          </div>
          <span class="text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all">
            ${Icons.arrowRight("w-4 h-4")}
          </span>
        </a>
      </div>

      <!-- Main Navigation -->
      <nav class="flex-1 px-3 py-2 space-y-1">
        <div class="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">User Platform</div>
        ${userNavItems
          .map((item) => {
            const isActive = activeRoute === item.href;
            return `
              <a href="${item.href}" class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              isActive
                ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/70"
            }">
                <div class="flex items-center gap-3">
                  <span class="${isActive ? "text-cyan-400" : "text-slate-400"}">${item.icon}</span>
                  <span>${item.label}</span>
                </div>
                ${
                  item.badge
                    ? `<span class="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-cyan-500/20 text-cyan-400">${item.badge}</span>`
                    : ""
                }
                ${
                  item.count !== undefined && item.count > 0
                    ? `<span class="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700">${item.count}</span>`
                    : ""
                }
              </a>
            `;
          })
          .join("")}

        <!-- Admin Divider -->
        <div class="pt-5 pb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Admin Foundation</span>
          <span class="px-1.5 py-0.2 text-[9px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded">Phase 1</span>
        </div>
        ${adminNavItems
          .map((item) => {
            const isActive = activeRoute === item.href;
            return `
              <a href="${item.href}" class="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }">
                <span class="${isActive ? "text-amber-400" : "text-slate-400"}">${item.icon}</span>
                <span class="truncate">${item.label}</span>
              </a>
            `;
          })
          .join("")}
      </nav>

      <!-- User Profile Card in Sidebar Footer -->
      <div class="p-4 border-t border-slate-800/80 bg-slate-950">
        <a href="#/profile" class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900 transition-colors group">
          <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-800 group-hover:ring-cyan-500 transition-all" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-white truncate group-hover:text-cyan-400 transition-colors">${user.name}</h4>
            <p class="text-[11px] text-slate-400 truncate">${user.email}</p>
          </div>
          <span class="text-slate-400 group-hover:text-slate-200">
            ${Icons.chevronDown("w-4 h-4")}
          </span>
        </a>
      </div>
    </aside>
  `;
}
