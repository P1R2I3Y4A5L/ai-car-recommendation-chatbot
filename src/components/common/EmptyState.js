/**
 * Empty State Component
 */

import { Icons } from "./Icons.js";
import { renderButton } from "./Button.js";

export function renderEmptyState({
  title = "No results found",
  description = "Try adjusting your search filters or start a new AI recommendation session.",
  icon = Icons.car("w-12 h-12 text-slate-500"),
  actionText = "Start AI Car Finder",
  actionRoute = "#/chat",
  actionIcon = Icons.sparkles("w-4 h-4")
}) {
  return `
    <div class="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-slate-700/80 bg-slate-900/40 backdrop-blur-sm my-6">
      <div class="w-20 h-20 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-5 shadow-inner">
        ${icon}
      </div>
      <h3 class="text-xl font-bold text-white mb-2 tracking-tight">${title}</h3>
      <p class="text-sm text-slate-400 max-w-md leading-relaxed mb-6">${description}</p>
      ${
        actionText
          ? renderButton({
              text: actionText,
              variant: "gradient",
              size: "md",
              icon: actionIcon,
              onClick: `window.location.hash='${actionRoute}'`
            })
          : ""
      }
    </div>
  `;
}
