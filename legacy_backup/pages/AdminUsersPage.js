/**
 * Admin User Management Page Component
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { adminService } from "../services/adminService.js";

export async function renderAdminUsersPage() {
  const searchQuery = window.adminUsersSearch || "";
  const users = await adminService.getUsersList(searchQuery);

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/admin/users")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "User Management Directory",
          subtitle: "Inspect registered driver profiles, recommendations generated, and activity"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <!-- Search Header -->
          <div class="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div class="relative w-full sm:w-80">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                ${Icons.search("w-4 h-4")}
              </div>
              <input
                type="text"
                placeholder="Search user name, email, or city..."
                value="${searchQuery}"
                oninput="window.handleAdminUserSearch(this.value)"
                class="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div class="text-xs text-slate-400">
              Total Accounts: <strong class="text-white">${users.length}</strong>
            </div>
          </div>

          <!-- Users Table -->
          <div class="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl backdrop-blur-xl">
            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider">
                    <th class="p-4">User</th>
                    <th class="p-4">Location</th>
                    <th class="p-4">Role</th>
                    <th class="p-4">AI Searches</th>
                    <th class="p-4">Saved Cars</th>
                    <th class="p-4">Status</th>
                    <th class="p-4 text-right">Last Active</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  ${users
                    .map(
                      (u) => `
                    <tr class="hover:bg-slate-800/40 transition-colors">
                      <td class="p-4">
                        <div class="flex items-center gap-3">
                          <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-xs">
                            ${u.name.charAt(0)}
                          </div>
                          <div>
                            <div class="font-bold text-white">${u.name}</div>
                            <div class="text-[11px] text-slate-400 font-mono">${u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td class="p-4 text-slate-300">${u.location}</td>
                      <td class="p-4">
                        <span class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          u.role === "Admin"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : "bg-slate-800 text-slate-300"
                        }">
                          ${u.role}
                        </span>
                      </td>
                      <td class="p-4 font-mono font-bold text-white">${u.recommendationsCount}</td>
                      <td class="p-4 font-mono text-cyan-400">${u.savedCount}</td>
                      <td class="p-4">
                        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          u.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-800 text-slate-400"
                        }">
                          <span class="w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-emerald-400" : "bg-slate-500"}"></span>
                          <span>${u.status}</span>
                        </span>
                      </td>
                      <td class="p-4 text-right text-slate-400 font-mono">${u.lastActive}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      ${renderMobileNav("#/admin/users")}
    </div>
  `;
}
