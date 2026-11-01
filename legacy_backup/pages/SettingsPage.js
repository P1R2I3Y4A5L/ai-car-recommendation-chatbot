/**
 * Settings Page Component
 * Sections: Account, Driving Preferences, Notifications, Appearance (Dark/Light), Privacy.
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { store } from "../../state/store.js";

export function renderSettingsPage() {
  const state = store.getState();
  const theme = state.theme;
  const activeTab = window.currentSettingsTab || "account";

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/settings")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "System Settings",
          subtitle: "Configure driving preferences, notifications, theme, and privacy"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto w-full">
          <!-- Settings Navigation Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 custom-scrollbar">
            <button
              onclick="window.switchSettingsTab('account')"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "account"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }"
            >
              Account
            </button>
            <button
              onclick="window.switchSettingsTab('preferences')"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "preferences"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }"
            >
              Car Preferences
            </button>
            <button
              onclick="window.switchSettingsTab('notifications')"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "notifications"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }"
            >
              Notifications
            </button>
            <button
              onclick="window.switchSettingsTab('appearance')"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "appearance"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }"
            >
              Appearance
            </button>
            <button
              onclick="window.switchSettingsTab('privacy')"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "privacy"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }"
            >
              Privacy & Data
            </button>
          </div>

          <!-- Tab Contents -->
          <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            ${
              activeTab === "account"
                ? `
              <div class="space-y-6">
                <div>
                  <h3 class="text-base font-bold text-white">Personal Information</h3>
                  <p class="text-xs text-slate-400">Update your account credentials and contact data.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Full Legal Name</label>
                    <input type="text" value="${state.user.name}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Email Address</label>
                    <input type="email" value="${state.user.email}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input type="text" value="${state.user.phone}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Primary City</label>
                    <input type="text" value="${state.user.location}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                </div>

                <button onclick="window.appStore.showToast({ title: 'Account Saved', message: 'Profile details updated successfully', type: 'success' })" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors">
                  Save Changes
                </button>
              </div>
            `
                : activeTab === "preferences"
                ? `
              <div class="space-y-6">
                <div>
                  <h3 class="text-base font-bold text-white">Default Recommendation Preferences</h3>
                  <p class="text-xs text-slate-400">Set standard defaults for new AI recommendation sessions.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Target Budget Tier</label>
                    <select class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white">
                      <option>₹5L – ₹10L (Entry & Compact)</option>
                      <option>₹10L – ₹15L (Popular Mid)</option>
                      <option selected>₹15L – ₹25L (Mid SUV / Sedan)</option>
                      <option>₹25L – ₹50L (Executive & MPV)</option>
                      <option>₹50L+ (Luxury)</option>
                    </select>
                  </div>

                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Preferred Powertrain</label>
                    <select class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white">
                      <option>Petrol</option>
                      <option selected>Hybrid & Electric</option>
                      <option>Diesel</option>
                      <option>CNG</option>
                    </select>
                  </div>
                </div>

                <button onclick="window.appStore.showToast({ title: 'Preferences Updated', message: 'Your driving vector defaults have been stored', type: 'success' })" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors">
                  Update Defaults
                </button>
              </div>
            `
                : activeTab === "appearance"
                ? `
              <div class="space-y-6">
                <div>
                  <h3 class="text-base font-bold text-white">Appearance & Theme</h3>
                  <p class="text-xs text-slate-400">Customize the user interface styling and visual modes.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div onclick="window.appStore.setTheme('dark')" class="p-5 rounded-2xl border cursor-pointer transition-all ${
                    theme === "dark"
                      ? "border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-950/30"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700"
                  }">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        ${Icons.moon("w-5 h-5 text-cyan-400")}
                        <span class="font-bold text-sm text-white">Dark Mode (Default)</span>
                      </div>
                      ${theme === "dark" ? `<span class="text-cyan-400 text-xs font-bold">Active ✓</span>` : ""}
                    </div>
                    <p class="text-xs text-slate-400 leading-relaxed">
                      Sleek high-contrast carbon palette optimized for automotive technology dashboards.
                    </p>
                  </div>

                  <div onclick="window.appStore.setTheme('light')" class="p-5 rounded-2xl border cursor-pointer transition-all ${
                    theme === "light"
                      ? "border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-950/30"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700"
                  }">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        ${Icons.sun("w-5 h-5 text-amber-400")}
                        <span class="font-bold text-sm text-white">Light Mode</span>
                      </div>
                      ${theme === "light" ? `<span class="text-cyan-400 text-xs font-bold">Active ✓</span>` : ""}
                    </div>
                    <p class="text-xs text-slate-400 leading-relaxed">
                      Crisp, high-luminance layout for brightly lit showroom and office environments.
                    </p>
                  </div>
                </div>
              </div>
            `
                : activeTab === "notifications"
                ? `
              <div class="space-y-6">
                <div>
                  <h3 class="text-base font-bold text-white">Notification Alerts</h3>
                  <p class="text-xs text-slate-400">Choose which automotive updates and price changes you receive.</p>
                </div>

                <div class="space-y-4 text-xs">
                  <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>
                      <div class="font-bold text-white">Recommendation Match Alerts</div>
                      <div class="text-slate-400 mt-0.5">Notify when a new vehicle launches that matches your score criteria</div>
                    </div>
                    <input type="checkbox" checked class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500 w-5 h-5" />
                  </div>

                  <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>
                      <div class="font-bold text-white">Price Drop & Subsidy Updates</div>
                      <div class="text-slate-400 mt-0.5">Alerts for state EV subsidies or festival discounts on saved cars</div>
                    </div>
                    <input type="checkbox" checked class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500 w-5 h-5" />
                  </div>
                </div>
              </div>
            `
                : `
              <div class="space-y-6">
                <div>
                  <h3 class="text-base font-bold text-white">Privacy & AI Data Retention</h3>
                  <p class="text-xs text-slate-400">Control how your preference vectors are stored and analyzed.</p>
                </div>

                <div class="space-y-4 text-xs">
                  <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>
                      <div class="font-bold text-white">Store Search History Locally</div>
                      <div class="text-slate-400 mt-0.5">Keep previous recommendation consultation sessions in this browser</div>
                    </div>
                    <input type="checkbox" checked class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500 w-5 h-5" />
                  </div>

                  <div class="p-4 rounded-2xl bg-red-950/20 border border-red-800/30 flex items-center justify-between">
                    <div>
                      <div class="font-bold text-red-300">Clear All Saved Local Data</div>
                      <div class="text-slate-400 mt-0.5">Reset saved wishlist, compare tray, and cached consultation sessions</div>
                    </div>
                    <button onclick="localStorage.clear(); window.location.reload();" class="px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold">
                      Clear Cache
                    </button>
                  </div>
                </div>
              </div>
            `
            }
          </div>
        </main>
      </div>

      ${renderMobileNav("#/settings")}
    </div>
  `;
}
