/**
 * Chat Input Component
 * Handles user text submissions, voice input placeholder, and suggested quick prompts.
 */

import { Icons } from "../common/Icons.js";

export function renderChatInput({ suggestedQuestions = [] } = {}) {
  return `
    <div class="border-t border-slate-800 bg-slate-950/80 p-4 sm:p-5 backdrop-blur-xl">
      <!-- Suggested Prompts / Questions Carousel -->
      ${
        suggestedQuestions && suggestedQuestions.length > 0
          ? `
        <div class="mb-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs custom-scrollbar">
          <span class="shrink-0 text-slate-400 font-semibold flex items-center gap-1">
            ${Icons.sparkles("w-3.5 h-3.5 text-cyan-400")}
            <span>Suggested:</span>
          </span>
          ${suggestedQuestions
            .map(
              (q) => `
            <button
              type="button"
              onclick="window.sendChatPrompt('${q.replace(/'/g, "\\'")}')"
              class="shrink-0 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors text-xs whitespace-nowrap"
            >
              ${q}
            </button>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }

      <!-- Main Input Bar -->
      <form id="chat-form" onsubmit="window.handleChatSubmit(event)" class="relative flex items-center gap-2">
        <div class="relative flex-1">
          <input
            type="text"
            id="chat-user-input"
            autocomplete="off"
            placeholder="Describe what you want (e.g. 'Looking for a safe automatic SUV under 20 Lakhs with high mileage')..."
            class="w-full pl-5 pr-12 py-3.5 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 shadow-inner transition-all"
          />
        </div>

        <button
          type="submit"
          id="chat-send-btn"
          class="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
          title="Send message"
        >
          ${Icons.send("w-5 h-5")}
        </button>
      </form>
      <div class="mt-2 text-center">
        <span class="text-[11px] text-slate-400">
          AutoMind AI evaluates 30+ automotive dimensions • Multi-factor matching v2.4
        </span>
      </div>
    </div>
  `;
}
