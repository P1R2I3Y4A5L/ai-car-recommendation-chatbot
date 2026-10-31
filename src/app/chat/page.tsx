"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, RotateCcw, MessageCircle } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ChatMessageBubble from "@/components/chat/ChatMessage";
import TypingIndicator from "@/components/chat/TypingIndicator";
import type { ChatMessage } from "@/types";
import { generateSessionId } from "@/lib/utils";

const SUGGESTED_PROMPTS = [
  "Suggest an SUV under ₹15 lakh with good mileage",
  "Compare Tata Nexon and Hyundai Creta",
  "Best electric cars for city driving",
  "I need a 7-seater family car",
  "Cars with best mileage under ₹10 lakh",
  "What are the specifications of Tata Nexon EV?",
];

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I am Vroomy AI 🚗\n\nI can assist you with:\n• Finding cars tailored to your budget and family requirements\n• Direct side-by-side spec comparisons\n• Highlighting mileage, EV range, and NCAP safety ratings\n• Impartial recommendations based on verified data\n\nWhat kind of car are you searching for today?",
  timestamp: 1700000000000,
};

function ChatPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q");

  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasAutoSent = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      const history = messages
        .filter((m) => m.id !== "welcome")
        .slice(-10)
        .map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("model" as const),
          parts: [{ text: m.content }],
        }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, sessionId, history }),
        });

        const json = await res.json();

        if (json.success) {
          const { data } = json;
          const assistantMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.message,
            cars: data.cars?.length > 0 ? data.cars : undefined,
            comparisonTable: data.comparisonTable,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMsg]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: `Request error: ${json.error}`,
              timestamp: Date.now(),
              isError: true,
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Network communication error. Please check connectivity and try again.",
            timestamp: Date.now(),
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [isLoading, messages, sessionId]
  );

  useEffect(() => {
    if (initialQuery && !hasAutoSent.current) {
      hasAutoSent.current = true;
      setTimeout(() => sendMessage(initialQuery), 400);
    }
  }, [initialQuery, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6 gap-4">
        {/* Chat Control Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">Vroomy AI Assistant</h1>
              <p className="text-xs text-slate-500">Gemini 1.5 Flash + Structured Database Matcher</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Session
          </button>
        </div>

        {/* Message Window */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((msg) => (
              <ChatMessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starters */}
          {messages.length === 1 && (
            <div className="px-4 sm:px-6 pb-3 border-t border-slate-100 bg-slate-50/50">
              <p className="text-xs text-slate-400 font-medium mb-2 mt-3">Quick inquiries:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="text-xs bg-white hover:bg-orange-50 hover:text-orange-700 border border-slate-200 hover:border-orange-200 text-slate-600 px-3 py-1.5 rounded-full transition-colors shadow-2xs"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 sm:p-4 border-t border-slate-100 bg-white">
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about cars, comparisons, mileage, budget... (Enter to send)"
                rows={2}
                className="flex-1 resize-none vroomy-input py-2.5 text-sm min-h-[52px] max-h-32"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-11 h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                aria-label="Send message"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              Vroomy AI provides recommendations referencing database specs. Check official dealer materials before purchase.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading AI interface...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
