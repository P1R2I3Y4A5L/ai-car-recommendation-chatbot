/**
 * Toast Notification Renderer
 */

import { Icons } from "./Icons.js";

export function renderToastContainer(toasts = []) {
  if (!toasts || toasts.length === 0) return "";

  const toastItems = toasts
    .map((t) => {
      let icon = Icons.info("w-5 h-5 text-blue-400");
      let border = "border-blue-500/30";

      if (t.type === "success") {
        icon = Icons.checkCircle("w-5 h-5 text-emerald-400");
        border = "border-emerald-500/30";
      } else if (t.type === "warning") {
        icon = Icons.info("w-5 h-5 text-amber-400");
        border = "border-amber-500/30";
      } else if (t.type === "error") {
        icon = Icons.close("w-5 h-5 text-red-400");
        border = "border-red-500/30";
      }

      return `
        <div class="flex items-start gap-3 p-4 bg-slate-900/95 border ${border} text-slate-100 rounded-2xl shadow-2xl backdrop-blur-xl pointer-events-auto transition-all duration-300 transform translate-y-0 opacity-100 max-w-sm w-full animate-slide-up">
          <div class="shrink-0 mt-0.5">${icon}</div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-white">${t.title}</h4>
            <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">${t.message}</p>
          </div>
          <button onclick="window.appStore.removeToast('${t.id}')" class="shrink-0 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
            ${Icons.close("w-4 h-4")}
          </button>
        </div>
      `;
    })
    .join("");

  return `
    <div id="toast-root" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      ${toastItems}
    </div>
  `;
}
