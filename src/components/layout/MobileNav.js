/**
 * Mobile Navigation: Bottom Bar & Off-Canvas Drawer
 */

import { Icons } from "../common/Icons.js";
import { store } from "../../state/store.js";

export function renderMobileNav(activeRoute = "#/dashboard") {
  const state = store.getState();
  const savedCount = state.savedCarIds.length;
  const compareCount = state.comparisonCarIds.length;

  return `
    <!-- Mobile Bottom Navigation Bar (Hidden on lg+) -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-xl px-2 py-2 flex items-center justify-around shadow-2xl">
      <a href="#/dashboard" class="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
        activeRoute === "#/dashboard" ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-white"
      }">
        ${Icons.dashboard("w-5 h-5")}
        <span class="text-[10px]">Dashboard</span>
      </a>

      <a href="#/chat" class="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
        activeRoute === "#/chat" ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-white"
      }">
        <div class="relative">
          ${Icons.bot("w-5 h-5")}
          <span class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400"></span>
        </div>
        <span class="text-[10px]">AI Finder</span>
      </a>

      <a href="#/results" class="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
        activeRoute === "#/results" ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-white"
      }">
        ${Icons.sparkles("w-5 h-5")}
        <span class="text-[10px]">Explore</span>
      </a>

      <a href="#/compare" class="relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
        activeRoute === "#/compare" ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-white"
      }">
        ${Icons.compare("w-5 h-5")}
        ${
          compareCount > 0
            ? `<span class="absolute top-0 right-2 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">${compareCount}</span>`
            : ""
        }
        <span class="text-[10px]">Compare</span>
      </a>

      <a href="#/saved" class="relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
        activeRoute === "#/saved" ? "text-cyan-400 font-bold" : "text-slate-400 hover:text-white"
      }">
        ${Icons.heart("w-5 h-5", savedCount > 0)}
        ${
          savedCount > 0
            ? `<span class="absolute top-0 right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">${savedCount}</span>`
            : ""
        }
        <span class="text-[10px]">Saved</span>
      </a>

      <button onclick="window.toggleMobileDrawer()" class="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-slate-400 hover:text-white">
        ${Icons.menu("w-5 h-5")}
        <span class="text-[10px]">Menu</span>
      </button>
    </nav>

    <!-- Off-Canvas Mobile Drawer -->
    <div id="mobile-drawer-backdrop" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md hidden transition-opacity duration-300" onclick="window.toggleMobileDrawer()">
      <div class="fixed inset-y-0 right-0 w-72 bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto" onclick="event.stopPropagation()">
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
            <div class="flex items-center gap-2">
              <span class="text-base font-extrabold text-white">AutoMind</span>
              <span class="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-cyan-500/20 text-cyan-400">AI</span>
            </div>
            <button onclick="window.toggleMobileDrawer()" class="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
              ${Icons.close("w-5 h-5")}
            </button>
          </div>

          <!-- Drawer Navigation Links -->
          <div class="space-y-1">
            <a href="#/" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">
              ${Icons.car("w-5 h-5 text-slate-400")}
              <span>Home</span>
            </a>
            <a href="#/about" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">
              ${Icons.info("w-5 h-5 text-slate-400")}
              <span>How It Works</span>
            </a>
            <a href="#/dashboard" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">
              ${Icons.dashboard("w-5 h-5 text-slate-400")}
              <span>Dashboard</span>
            </a>
            <a href="#/chat" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/40">
              ${Icons.bot("w-5 h-5 text-cyan-400")}
              <span>AI Car Finder</span>
            </a>
            <a href="#/results" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">
              ${Icons.sparkles("w-5 h-5 text-slate-400")}
              <span>Recommended Cars</span>
            </a>
            <a href="#/compare" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">
              ${Icons.compare("w-5 h-5 text-slate-400")}
              <span>Compare Tray (${compareCount})</span>
            </a>
            <a href="#/saved" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">
              ${Icons.heart("w-5 h-5 text-slate-400")}
              <span>Saved Cars (${savedCount})</span>
            </a>
            <a href="#/history" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">
              ${Icons.history("w-5 h-5 text-slate-400")}
              <span>Search History</span>
            </a>
            <a href="#/profile" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">
              ${Icons.user("w-5 h-5 text-slate-400")}
              <span>My Profile</span>
            </a>
            <a href="#/settings" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800">
              ${Icons.settings("w-5 h-5 text-slate-400")}
              <span>Settings</span>
            </a>
            <div class="pt-4 pb-2 border-t border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Admin Foundation</div>
            <a href="#/admin" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-amber-400 hover:bg-amber-950/30">
              ${Icons.shield("w-5 h-5 text-amber-400")}
              <span>Admin Dashboard</span>
            </a>
            <a href="#/admin/cars" onclick="window.toggleMobileDrawer()" class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-amber-400 hover:bg-amber-950/30">
              ${Icons.car("w-5 h-5 text-amber-400")}
              <span>Car Catalog</span>
            </a>
          </div>
        </div>

        <!-- Footer Actions in Drawer -->
        <div class="pt-6 border-t border-slate-800 space-y-3">
          <button onclick="window.appStore.toggleTheme()" class="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200">
            <span>Appearance</span>
            <span>${state.theme === "dark" ? "Dark Mode 🌙" : "Light Mode ☀️"}</span>
          </button>
          <a href="#/login" onclick="window.toggleMobileDrawer()" class="block w-full text-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">
            Switch / Demo Login
          </a>
        </div>
      </div>
    </div>
  `;
}
