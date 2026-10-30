/**
 * Chat Message Component
 * Renders AI bubbles with automotive branding, quick selection chips, and user bubbles.
 */

import { Icons } from "../common/Icons.js";

export function renderChatMessage(msg) {
  const isAi = msg.sender === "ai";

  // Simple markdown bold/list parser for chat text
  const formattedText = msg.text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');

  return `
    <div class="flex items-start gap-3.5 ${isAi ? "" : "flex-row-reverse"} group animate-slide-up">
      <!-- Avatar -->
      <div class="shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg ${
        isAi
          ? "bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white"
          : "bg-slate-800 border border-slate-700 text-cyan-400"
      }">
        ${isAi ? Icons.bot("w-5 h-5") : Icons.user("w-5 h-5")}
      </div>

      <!-- Bubble Content -->
      <div class="max-w-[85%] sm:max-w-xl flex flex-col ${isAi ? "items-start" : "items-end"}">
        <div class="flex items-center gap-2 mb-1 px-1">
          <span class="text-[11px] font-bold ${isAi ? "text-cyan-400" : "text-slate-300"}">
            ${isAi ? "AI Car Advisor" : "You"}
          </span>
          <span class="text-[10px] text-slate-400">${msg.timestamp || "Just now"}</span>
        </div>

        <div class="p-4 rounded-3xl text-sm leading-relaxed ${
          isAi
            ? "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm shadow-xl backdrop-blur-md"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-lg shadow-blue-600/20"
        }">
          <div class="prose prose-invert prose-sm max-w-none">
            ${formattedText}
          </div>
        </div>

        <!-- Interactive Quick Select Chips (Attached to AI message) -->
        ${
          msg.chips && msg.chips.length > 0
            ? `
          <div class="mt-3 flex flex-wrap gap-2 pt-1">
            ${msg.chips
              .map(
                (chip, idx) => `
              <button
                type="button"
                onclick='window.handleChipClick(${JSON.stringify(chip).replace(/'/g, "&apos;")})'
                class="px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all duration-200 shadow-sm active:scale-95 ${
                  chip.category === "action"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400/50 hover:brightness-110 shadow-cyan-500/20"
                    : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700/80 hover:border-cyan-500/60 hover:text-white"
                }"
              >
                ${chip.label}
              </button>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;
}
