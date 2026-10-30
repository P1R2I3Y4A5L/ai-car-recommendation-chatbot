/**
 * Admin Car Management Modal Form (Add / Edit Car)
 */

import { Icons } from "../common/Icons.js";

export function renderCarManagementModal() {
  return `
    <div id="car-form-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md hidden opacity-0 transition-opacity duration-200" onclick="if(event.target === this) window.closeCarModal()">
      <div class="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden modal-dialog">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div class="flex items-center gap-2">
            ${Icons.car("w-5 h-5 text-amber-400")}
            <h3 id="car-modal-title" class="text-base font-bold text-white tracking-tight">Add New Vehicle to Catalog</h3>
          </div>
          <button onclick="window.closeCarModal()" class="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            ${Icons.close("w-5 h-5")}
          </button>
        </div>

        <!-- Form Body -->
        <form id="car-admin-form" onsubmit="window.handleCarFormSubmit(event)" class="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar space-y-4 text-xs">
          <input type="hidden" id="car-form-id" value="" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-300 mb-1">Manufacturer / Brand *</label>
              <input type="text" id="car-form-brand" required placeholder="e.g. Hyundai" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Model Name *</label>
              <input type="text" id="car-form-model" required placeholder="e.g. Creta" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-semibold text-slate-300 mb-1">Variant *</label>
              <input type="text" id="car-form-variant" required placeholder="e.g. SX (O) 1.5 Turbo" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Price (INR Number) *</label>
              <input type="number" id="car-form-price" required placeholder="e.g. 1999000" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Body Style *</label>
              <select id="car-form-body" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500">
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="MPV">MPV</option>
                <option value="Coupe">Coupe</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-semibold text-slate-300 mb-1">Fuel Type *</label>
              <select id="car-form-fuel" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="CNG">CNG</option>
              </select>
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Transmission *</label>
              <select id="car-form-transmission" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500">
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Seating Capacity</label>
              <input type="number" id="car-form-seating" value="5" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-semibold text-slate-300 mb-1">Mileage / Range *</label>
              <input type="text" id="car-form-mileage" required placeholder="e.g. 18.4 km/l or 450 km/chg" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
            </div>

            <div>
              <label class="block font-semibold text-slate-300 mb-1">Safety Rating</label>
              <select id="car-form-safety" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500">
                <option value="5">5-Star NCAP</option>
                <option value="4">4-Star NCAP</option>
                <option value="3">3-Star NCAP</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">Primary Image URL</label>
            <input type="url" id="car-form-image" placeholder="https://images.unsplash.com/..." class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
          </div>

          <div>
            <label class="block font-semibold text-slate-300 mb-1">Overview Description</label>
            <textarea id="car-form-overview" rows="2" placeholder="Brief summary of vehicle positioning..." class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"></textarea>
          </div>

          <!-- Footer Buttons -->
          <div class="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button type="button" onclick="window.closeCarModal()" class="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors">
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
