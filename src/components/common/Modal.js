/**
 * Modal Dialog Component
 */

import { Icons } from "./Icons.js";

export function renderModal({
  id = "app-modal",
  title = "Modal Title",
  contentHtml = "",
  footerHtml = "",
  size = "md" // 'sm' | 'md' | 'lg' | 'xl'
}) {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl"
  }[size] || "max-w-xl";

  return `
    <div id="${id}" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-200 opacity-0 pointer-events-none modal-container" onclick="if(event.target === this) window.closeModal('${id}')">
      <div class="relative w-full ${sizeClasses} bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden transform scale-95 transition-all duration-200 modal-dialog">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <h3 class="text-lg font-bold text-white tracking-tight">${title}</h3>
          <button onclick="window.closeModal('${id}')" class="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors">
            ${Icons.close("w-5 h-5")}
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          ${contentHtml}
        </div>

        <!-- Footer -->
        ${
          footerHtml
            ? `<div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/50">${footerHtml}</div>`
            : ""
        }
      </div>
    </div>
  `;
}
