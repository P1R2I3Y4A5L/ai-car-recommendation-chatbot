/**
 * AI Car Recommendation Chatbot Page (Core Application Feature)
 * Dual-pane layout: Conversational AI on left, Live Preference Summary on right.
 */

import { Icons } from "../components/common/Icons.js";
import { renderSidebar } from "../components/layout/Sidebar.js";
import { renderHeader } from "../components/layout/Header.js";
import { renderMobileNav } from "../components/layout/MobileNav.js";
import { renderChatMessage } from "../components/chat/ChatMessage.js";
import { renderChatInput } from "../components/chat/ChatInput.js";
import { renderPreferenceSidebar } from "../components/chat/PreferenceSidebar.js";
import { chatService } from "../services/chatService.js";
import { store } from "../state/store.js";

export function renderChatbotPage() {
  const state = store.getState();
  const messages = window.activeChatMessages || chatService.getInitialState().messages;
  const preferences = state.currentPreferences;

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      <!-- App Sidebar -->
      ${renderSidebar("#/chat")}

      <!-- Main Chat Area Container -->
      <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden pb-16 lg:pb-0">
        <!-- Dashboard Top Header -->
        ${renderHeader({
          title: "AI Automotive Advisor",
          subtitle: "Conversational recommendation engine with live parameter extraction"
        })}

        <!-- Dual Pane Flex Container -->
        <div class="flex-1 flex flex-col lg:flex-row min-w-0 overflow-hidden relative">
          <!-- Left Pane: Interactive Chat Conversation -->
          <div class="flex-1 flex flex-col min-w-0 bg-slate-950/40 relative h-full">
            <!-- Chat Conversation Scroll Area -->
            <div id="chat-messages-container" class="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 space-y-6">
              <!-- AI Introduction Banner -->
              <div class="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-300 flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>AI Advisor v2.4 Active • Adaptive Decision Tree Active</span>
                </div>
                <button onclick="window.resetChatSession()" class="text-slate-400 hover:text-white transition-colors underline text-[11px]">
                  Restart Session
                </button>
              </div>

              <!-- Message Stream -->
              ${messages.map((m) => renderChatMessage(m)).join("")}

              <!-- Typing Indicator Placeholder (hidden by default) -->
              <div id="chat-typing-indicator" class="hidden flex items-center gap-3 text-xs text-slate-400 animate-pulse">
                <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white">
                  ${Icons.bot("w-4 h-4")}
                </div>
                <div class="px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span class="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span class="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span class="ml-2 text-slate-300">Evaluating multi-attribute catalog...</span>
                </div>
              </div>
            </div>

            <!-- Chat Bottom Input Bar -->
            ${renderChatInput({ suggestedQuestions: chatService.getInitialState().suggestedQuestions })}
          </div>

          <!-- Right Pane: Live Updating Preference Vector -->
          <div id="preference-sidebar-root" class="h-full">
            ${renderPreferenceSidebar(preferences)}
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      ${renderMobileNav("#/chat")}
    </div>
  `;
}
