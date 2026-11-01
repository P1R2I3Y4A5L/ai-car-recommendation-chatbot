/**
 * Admin Car Management Page Component
 * Car catalog table, search, filters, Add car modal trigger, edit/delete actions.
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { renderCarManagementModal } from "../components/admin/CarManagementModal.js";
import { adminService } from "../services/adminService.js";

export async function renderAdminCarsPage() {
  const searchQuery = window.adminCarsSearch || "";
  const bodyFilter = window.adminCarsBodyFilter || "all";
  const cars = await adminService.getCarList(searchQuery, bodyFilter);

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      ${renderSidebar("#/admin/cars")}

      <div class="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar pb-24 lg:pb-12">
        ${renderHeader({
          title: "Fleet Catalog Management",
          subtitle: "Create, review, configure, and curate vehicles in the AI recommendation index"
        })}

        <main class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <!-- Control Bar -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-xl">
            <!-- Search & Filters -->
            <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto flex-1 max-w-xl">
              <div class="relative flex-1 min-w-[200px]">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  ${Icons.search("w-4 h-4")}
                </div>
                <input
                  type="text"
                  placeholder="Search brand, model, or variant..."
                  value="${searchQuery}"
                  oninput="window.handleAdminCarSearch(this.value)"
                  class="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <select
                onchange="window.handleAdminCarBodyFilter(this.value)"
                class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500"
              >
                <option value="all" ${bodyFilter === "all" ? "selected" : ""}>All Body Types</option>
                <option value="SUV" ${bodyFilter === "SUV" ? "selected" : ""}>SUV</option>
                <option value="Sedan" ${bodyFilter === "Sedan" ? "selected" : ""}>Sedan</option>
                <option value="Hatchback" ${bodyFilter === "Hatchback" ? "selected" : ""}>Hatchback</option>
                <option value="MPV" ${bodyFilter === "MPV" ? "selected" : ""}>MPV</option>
                <option value="Coupe" ${bodyFilter === "Coupe" ? "selected" : ""}>Coupe</option>
              </select>
            </div>

            <!-- Add Car Button -->
            <button
              type="button"
              onclick="window.openAddCarModal()"
              class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20"
            >
              ${Icons.plus("w-4 h-4")}
              <span>Add Vehicle</span>
            </button>
          </div>

          <!-- Catalog Table -->
          <div class="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl backdrop-blur-xl">
            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider">
                    <th class="p-4">Vehicle Model</th>
                    <th class="p-4">Ex-Showroom Price</th>
                    <th class="p-4">Powertrain</th>
                    <th class="p-4">Gearbox</th>
                    <th class="p-4">Safety NCAP</th>
                    <th class="p-4">Efficiency</th>
                    <th class="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  ${
                    cars.length > 0
                      ? cars
                          .map(
                            (c) => `
                        <tr class="hover:bg-slate-800/40 transition-colors">
                          <td class="p-4">
                            <div class="flex items-center gap-3">
                              <img src="${c.primaryImage}" alt="${c.model}" class="w-12 h-9 rounded-lg object-cover bg-slate-950" />
                              <div>
                                <span class="font-bold text-white">${c.brand} ${c.model}</span>
                                <div class="text-[10px] text-slate-400 truncate max-w-[180px]">${c.variant}</div>
                              </div>
                            </div>
                          </td>
                          <td class="p-4 font-mono font-bold text-white">${c.priceFormatted}</td>
                          <td class="p-4">
                            <span class="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                              ${c.specs.fuelType}
                            </span>
                          </td>
                          <td class="p-4 text-slate-300">${c.specs.transmission}</td>
                          <td class="p-4 text-amber-400 font-semibold">${c.specs.safetyRating.stars}-Star ${c.specs.safetyRating.agency.split(" ")[0]}</td>
                          <td class="p-4 font-mono text-emerald-400">${c.specs.mileage}</td>
                          <td class="p-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                              <a href="#/car/${c.id}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white" title="View details">
                                ${Icons.info("w-3.5 h-3.5")}
                              </a>
                              <button onclick="window.editCarById('${c.id}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300" title="Edit vehicle">
                                ${Icons.settings("w-3.5 h-3.5")}
                              </button>
                              <button onclick="window.deleteCarById('${c.id}', '${c.brand} ${c.model}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400" title="Delete vehicle">
                                ${Icons.trash("w-3.5 h-3.5")}
                              </button>
                            </div>
                          </td>
                        </tr>
                      `
                          )
                          .join("")
                      : `
                    <tr>
                      <td colspan="7" class="p-8 text-center text-slate-400">
                        No vehicles found matching current query.
                      </td>
                    </tr>
                  `
                  }
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <!-- Add/Edit Modal Injection -->
      ${renderCarManagementModal()}

      ${renderMobileNav("#/admin/cars")}
    </div>
  `;
}
