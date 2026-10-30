/**
 * Profile Page Component
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { store } from "../state/store.js";

export function renderProfilePage() {
  const state = store.getState();
  const user = state.user;
  const prefs = user.preferences || {};

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/profile")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "Driver Profile",
          subtitle: "Manage personal credentials, driving habits, and automotive preferences"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto w-full">
          <!-- Profile Card -->
          <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div class="flex items-center gap-5">
                <div class="relative group">
                  <img
                    src="${user.avatar}"
                    alt="${user.name}"
                    class="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-800 shadow-xl"
                  />
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow">
                    ✓
                  </div>
                </div>

                <div>
                  <h2 class="text-2xl font-extrabold text-white tracking-tight">${user.name}</h2>
                  <p class="text-xs text-slate-400 font-mono mt-0.5">${user.email}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Verified Driver</span>
                    <span class="text-xs text-slate-400">• Member since ${user.joinedDate || "2024"}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onclick="window.openEditProfileModal()"
                class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2"
              >
                ${Icons.settings("w-4 h-4 text-cyan-400")}
                <span>Edit Profile</span>
              </button>
            </div>

            <!-- Profile Details Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div class="space-y-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone Number</span>
                <p class="text-sm font-semibold text-white font-mono">${user.phone}</p>
              </div>

              <div class="space-y-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Primary Driving Location</span>
                <p class="text-sm font-semibold text-white">${user.location}</p>
              </div>

              <div class="space-y-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Default Budget Bracket</span>
                <p class="text-sm font-semibold text-cyan-300 font-mono">${prefs.budgetFormatted || "₹15L – ₹25L"}</p>
              </div>

              <div class="space-y-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Preferred Fuel Type</span>
                <p class="text-sm font-semibold text-white">${prefs.fuelPreferences?.join(", ") || "Petrol, Hybrid"}</p>
              </div>

              <div class="space-y-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Preferred Body Architecture</span>
                <p class="text-sm font-semibold text-white">${prefs.bodyTypes?.join(", ") || "SUV, Sedan"}</p>
              </div>

              <div class="space-y-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Preferred Transmission</span>
                <p class="text-sm font-semibold text-white">${prefs.transmission || "Automatic"}</p>
              </div>
            </div>
          </div>

          <!-- Wishlist & Comparison Quick Status -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <div>
                <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Wishlist Garage</div>
                <div class="text-2xl font-extrabold text-white mt-1">${state.savedCarIds.length} Vehicles</div>
              </div>
              <a href="#/saved" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors">
                View Garage →
              </a>
            </div>

            <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <div>
                <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Comparisons</div>
                <div class="text-2xl font-extrabold text-white mt-1">${state.comparisonCarIds.length} / 4 Selected</div>
              </div>
              <a href="#/compare" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors">
                View Matrix →
              </a>
            </div>
          </div>
        </main>
      </div>

      ${renderMobileNav("#/profile")}
    </div>
  `;
}
