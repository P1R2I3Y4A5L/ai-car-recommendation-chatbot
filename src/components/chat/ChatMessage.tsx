"use client";

import { useEffect, useState } from "react";
import { Bot, User } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/types";
import CarCard from "@/components/cars/CarCard";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    if (message.timestamp) {
      setFormattedTime(
        new Date(message.timestamp).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  }, [message.timestamp]);

  return (
    <div className={`flex gap-3 animate-fade-in ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-orange-500" : "bg-slate-800"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-3 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-orange-500 text-white rounded-br-sm"
              : message.isError
              ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-sm"
              : "bg-white text-slate-800 border border-slate-100 shadow-sm rounded-bl-sm"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Car results */}
        {message.cars && message.cars.length > 0 && (
          <div className="w-full">
            <p className="text-xs text-slate-500 mb-2 font-medium">
              {message.cars.length} car{message.cars.length !== 1 ? "s" : ""} found:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              {message.cars.slice(0, 4).map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        )}

        {/* Formatted Timestamp (suppresses hydration mismatch) */}
        {formattedTime && (
          <p className="text-xs text-slate-400" suppressHydrationWarning>
            {formattedTime}
          </p>
        )}
      </div>
    </div>
  );
}
