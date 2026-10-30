/**
 * Public Navigation Bar Component
 */

import { Icons } from "../common/Icons.js";
import { store } from "../../state/store.js";

export function renderNavbar(activeRoute = "#/") {
  const state = store.getState();
  const savedCount = state.savedCarIds.length;
  const compareCount = state.comparisonCarIds.length;

  const navLinks = [
    { label: "Home", href: "#/" },
    { label: "How It Works", href: "#/about" },
    { label: "Explore Cars", href: "#/results" },
    { label: "AI Advisor", href: "#/chat" }
  ];

  const linksHtml = navLinks
    .map(
      (link) => `
        <a href="${link.href}" class="text-sm font-medium transition-colors hover:text-white ${
        activeRoute === link.href ? "text-cyan-400 font-semibold" : "text-slate-300"
      }">
          ${link.label}
        </a>
      `
    )
    .join("");

  return `
    <header class="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <a href="#/" class="flex items-center gap-3 group">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              ${Icons.car("w-6 h-6 text-cyan-400")}
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-lg font-extrabold tracking-tight text-white font-heading">AutoMind</span>
              <span class="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">AI</span>
            </div>
            <p class="text-[11px] text-slate-400 tracking-wide font-medium">Smart Car Recommendation</p>
          </div>
        </a>

        <!-- Center Nav -->
        <nav class="hidden md:flex items-center gap-8">
          ${linksHtml}
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          <!-- Saved Wishlist Quick Icon -->
          <a href="#/saved" class="relative p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors" title="Saved Cars">
            ${Icons.heart("w-5 h-5", savedCount > 0)}
            ${
              savedCount > 0
                ? `<span class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-slate-950">${savedCount}</span>`
                : ""
            }
          </a>

          <!-- Compare Quick Icon -->
          <a href="#/compare" class="relative p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors" title="Compare Cars">
            ${Icons.compare("w-5 h-5")}
            ${
              compareCount > 0
                ? `<span class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-slate-950">${compareCount}</span>`
                : ""
            }
          </a>

          <!-- Theme Toggle -->
          <button onclick="window.appStore.toggleTheme()" class="p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors" title="Toggle Theme">
            ${state.theme === "dark" ? Icons.sun("w-5 h-5 text-amber-400") : Icons.moon("w-5 h-5 text-indigo-400")}
          </button>

          <!-- App Dashboard / Find Car CTA -->
          <a href="#/dashboard" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-700 hover:border-slate-600 bg-slate-900 hover:bg-slate-800 text-white transition-all">
            ${Icons.dashboard("w-4 h-4 text-cyan-400")}
            <span>Dashboard</span>
          </a>

          <a href="#/chat" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
            ${Icons.sparkles("w-4 h-4")}
            <span>Find My Car</span>
          </a>

          <!-- Mobile Menu Button -->
          <button onclick="window.toggleMobileDrawer()" class="md:hidden p-2 text-slate-300 hover:text-white rounded-xl border border-slate-800 bg-slate-900/60">
            ${Icons.menu("w-6 h-6")}
          </button>
        </div>
      </div>
    </header>
  `;
}
