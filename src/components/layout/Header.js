/**
 * Dashboard & Application Header Component
 */

import { Icons } from "../common/Icons.js";
import { store } from "../../state/store.js";

export function renderHeader({ title = "", subtitle = "" } = {}) {
  const state = store.getState();
  const user = state.user;

  // Determine time of day greeting
  const hours = new Date().getHours();
  let greetingTime = "Good evening";
  if (hours < 12) greetingTime = "Good morning";
  else if (hours < 17) greetingTime = "Good afternoon";

  return `
    <header class="h-20 shrink-0 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20">
      <!-- Left: Mobile Menu Toggle & Title / Greeting -->
      <div class="flex items-center gap-4">
        <button onclick="window.toggleMobileDrawer()" class="lg:hidden p-2 text-slate-300 hover:text-white rounded-xl border border-slate-800 bg-slate-900">
          ${Icons.menu("w-5 h-5")}
        </button>

        <div>
          ${
            title
              ? `<h1 class="text-xl font-extrabold text-white tracking-tight font-heading">${title}</h1>`
              : `<h1 class="text-xl font-extrabold text-white tracking-tight font-heading">${greetingTime}, <span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">${user.name.split(" ")[0]}</span></h1>`
          }
          <p class="text-xs text-slate-400">${subtitle || "AI-powered vehicle match analytics & recommendations"}</p>
        </div>
      </div>

      <!-- Center / Right: Live Catalog Search & User Tools -->
      <div class="flex items-center gap-3">
        <!-- Live Search Box with quick dropdown -->
        <div class="relative hidden sm:block w-64 md:w-80">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            ${Icons.search("w-4 h-4")}
          </div>
          <input
            type="text"
            id="global-search-input"
            placeholder="Search cars, brands, body types..."
            class="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
            oninput="window.handleGlobalSearch(this.value)"
            onfocus="window.handleGlobalSearch(this.value)"
          />
          <div id="global-search-results" class="hidden absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 max-h-80 overflow-y-auto"></div>
        </div>

        <!-- Notification Bell with dropdown -->
        <div class="relative">
          <button onclick="window.toggleNotificationsDropdown()" class="relative p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors">
            ${Icons.bell("w-5 h-5")}
            <span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950"></span>
          </button>
          
          <div id="notifications-dropdown" class="hidden absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 p-4 animate-slide-up">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
              <h4 class="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
              <span class="text-[10px] text-cyan-400 font-semibold">2 New Alerts</span>
            </div>
            <div class="space-y-2.5">
              <div class="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                <div class="flex items-center justify-between text-[11px] font-bold text-white mb-1">
                  <span>Price Drop Alert</span>
                  <span class="text-slate-400 text-[10px]">10m ago</span>
                </div>
                <p class="text-[11px] text-slate-300">Hyundai Creta SX (O) now has a ₹45,000 festival benefit.</p>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                <div class="flex items-center justify-between text-[11px] font-bold text-white mb-1">
                  <span>New EV Launch</span>
                  <span class="text-slate-400 text-[10px]">2h ago</span>
                </div>
                <p class="text-[11px] text-slate-300">Tata Curvv.ev specs matching your preference vector added.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Theme Toggle -->
        <button onclick="window.appStore.toggleTheme()" class="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white transition-colors" title="Toggle Appearance">
          ${state.theme === "dark" ? Icons.sun("w-5 h-5 text-amber-400") : Icons.moon("w-5 h-5 text-indigo-400")}
        </button>

        <!-- User Menu Avatar -->
        <a href="#/profile" class="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all">
          <img src="${user.avatar}" alt="${user.name}" class="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-800 hover:ring-cyan-500 transition-all" />
          <span class="hidden md:inline text-xs font-semibold text-slate-200">${user.name.split(" ")[0]}</span>
        </a>
      </div>
    </header>
  `;
}
