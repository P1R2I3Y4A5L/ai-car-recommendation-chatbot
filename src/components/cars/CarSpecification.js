/**
 * Car Specification Matrix Component
 */

import { Icons } from "../common/Icons.js";

export function renderCarSpecification(specs) {
  const specRows = [
    { label: "Engine / Powertrain", value: specs.engine, icon: Icons.cog ? Icons.car("w-4 h-4 text-cyan-400") : "" },
    { label: "Max Power Output", value: specs.power, icon: Icons.zap("w-4 h-4 text-amber-400") },
    { label: "Peak Torque", value: specs.torque, icon: Icons.gauge("w-4 h-4 text-indigo-400") },
    { label: "Certified Mileage / Range", value: specs.mileage, icon: Icons.fuel("w-4 h-4 text-emerald-400") },
    { label: "Acceleration (0-100 km/h)", value: specs.acceleration, icon: Icons.gauge("w-4 h-4 text-blue-400") },
    { label: "Transmission Type", value: specs.transmission, icon: Icons.transmission("w-4 h-4 text-slate-400") },
    { label: "Seating Capacity", value: `${specs.seating} Occupants`, icon: Icons.seat("w-4 h-4 text-slate-400") },
    { label: "Boot Space (Luggage)", value: specs.bootSpace, icon: Icons.car("w-4 h-4 text-slate-400") },
    { label: "Ground Clearance", value: specs.groundClearance, icon: Icons.arrowRight("w-4 h-4 text-slate-400") },
    {
      label: "Crash Safety Rating",
      value: `${specs.safetyRating.stars}-Star (${specs.safetyRating.agency}) with ${specs.safetyRating.airbags} Airbags`,
      icon: Icons.shield("w-4 h-4 text-emerald-400")
    }
  ];

  return `
    <div class="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
      <div class="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <h3 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
          ${Icons.gauge("w-5 h-5 text-cyan-400")}
          <span>Technical Specifications & Dimensions</span>
        </h3>
        <span class="text-xs font-mono text-slate-400">Verified OEM Specs</span>
      </div>

      <div class="divide-y divide-slate-800/80">
        ${specRows
          .map(
            (row, idx) => `
            <div class="grid grid-cols-1 sm:grid-cols-3 px-6 py-3.5 text-sm ${
              idx % 2 === 0 ? "bg-slate-950/20" : "bg-transparent"
            } hover:bg-slate-800/40 transition-colors">
              <div class="flex items-center gap-2.5 text-slate-400 font-medium">
                ${row.icon}
                <span>${row.label}</span>
              </div>
              <div class="sm:col-span-2 text-white font-semibold mt-1 sm:mt-0">
                ${row.value}
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;
}
