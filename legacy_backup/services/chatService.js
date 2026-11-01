/**
 * Chat Service - Conversational Logic & State Coordination
 * Intercepts chat inputs, manages interactive decision steps, and extracts preferences.
 */

import { chatConversationSteps, suggestedQuestions } from "../data/chat.js";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const chatService = {
  /**
   * Process incoming user input (either chip selection or free-form text)
   * Returns AI response message and updated preferences.
   */
  async processMessage(input, currentStepIndex = 0, currentPreferences = {}) {
    await delay(350); // Simulate AI natural language processing

    let updatedPreferences = { ...currentPreferences };
    let replyText = "";
    let nextStepIndex = currentStepIndex;
    let chips = [];
    let isReady = false;

    // Check if input is a structured chip selection
    if (typeof input === "object" && input.category) {
      const { category, value } = input;

      if (category === "budget") {
        updatedPreferences.budgetMin = value.min;
        updatedPreferences.budgetMax = value.max;
        updatedPreferences.budgetFormatted = value.label;
      } else if (category === "usage") {
        updatedPreferences.usage = value;
      } else if (category === "fuel") {
        updatedPreferences.fuelPreferences = [value];
      } else if (category === "bodyType") {
        updatedPreferences.bodyTypes = [value];
      } else if (category === "transmission") {
        updatedPreferences.transmission = value;
      } else if (category === "seating") {
        updatedPreferences.seatingCapacity = value;
      } else if (category === "priorityFeatures") {
        if (!updatedPreferences.priorityFeatures) updatedPreferences.priorityFeatures = [];
        if (!updatedPreferences.priorityFeatures.includes(value)) {
          updatedPreferences.priorityFeatures.push(value);
        }
      }

      // Progress to next conversation question
      nextStepIndex = currentStepIndex + 1;

      if (nextStepIndex < chatConversationSteps.length) {
        const nextStep = chatConversationSteps[nextStepIndex];
        replyText = nextStep.aiPrompt;
        chips = nextStep.chips;
      } else {
        // Conversation complete!
        isReady = true;
        replyText = `🎯 **I have synthesized your profile!**\n\nBased on your **${updatedPreferences.budgetFormatted || "specified budget"}**, **${updatedPreferences.usage || "usage"}** focus, **${updatedPreferences.fuelPreferences?.[0] || "fuel"}** preference, and **${updatedPreferences.bodyTypes?.[0] || "car"}** body style, I've matched the top candidate vehicles ranked by AI alignment score.\n\nClick below to inspect your tailored car recommendations with full specs & comparison matrix.`;
        chips = [
          { label: "🚀 View Recommended Cars", value: "VIEW_RESULTS", category: "action" },
          { label: "🔄 Refine Preferences", value: "RESTART", category: "action" }
        ];
      }
    } else {
      // Natural language text parsing
      const text = String(input).toLowerCase();

      // Quick keyword extractors
      if (text.includes("ev") || text.includes("electric")) {
        updatedPreferences.fuelPreferences = ["Electric"];
      } else if (text.includes("hybrid")) {
        updatedPreferences.fuelPreferences = ["Hybrid"];
      } else if (text.includes("petrol")) {
        updatedPreferences.fuelPreferences = ["Petrol"];
      } else if (text.includes("diesel")) {
        updatedPreferences.fuelPreferences = ["Diesel"];
      } else if (text.includes("cng")) {
        updatedPreferences.fuelPreferences = ["CNG"];
      }

      if (text.includes("suv")) {
        updatedPreferences.bodyTypes = ["SUV"];
      } else if (text.includes("sedan")) {
        updatedPreferences.bodyTypes = ["Sedan"];
      } else if (text.includes("hatchback") || text.includes("hatch")) {
        updatedPreferences.bodyTypes = ["Hatchback"];
      } else if (text.includes("mpv") || text.includes("7 seater") || text.includes("7-seater")) {
        updatedPreferences.bodyTypes = ["MPV"];
        updatedPreferences.seatingCapacity = 7;
      }

      if (text.includes("automatic") || text.includes("amt") || text.includes("dct")) {
        updatedPreferences.transmission = "Automatic";
      } else if (text.includes("manual")) {
        updatedPreferences.transmission = "Manual";
      }

      if (text.includes("safety") || text.includes("5 star") || text.includes("safe")) {
        if (!updatedPreferences.priorityFeatures) updatedPreferences.priorityFeatures = [];
        updatedPreferences.priorityFeatures.push("5-Star Safety Rating");
      }

      if (text.includes("sunroof")) {
        if (!updatedPreferences.priorityFeatures) updatedPreferences.priorityFeatures = [];
        updatedPreferences.priorityFeatures.push("Panoramic Sunroof");
      }

      if (text.includes("under 10") || text.includes("10 lakh") || text.includes("10l")) {
        updatedPreferences.budgetMin = 500000;
        updatedPreferences.budgetMax = 1000000;
        updatedPreferences.budgetFormatted = "₹5L – ₹10L";
      } else if (text.includes("under 15") || text.includes("15 lakh") || text.includes("15l")) {
        updatedPreferences.budgetMin = 1000000;
        updatedPreferences.budgetMax = 1500000;
        updatedPreferences.budgetFormatted = "₹10L – ₹15L";
      } else if (text.includes("under 25") || text.includes("20 lakh") || text.includes("25l")) {
        updatedPreferences.budgetMin = 1500000;
        updatedPreferences.budgetMax = 2500000;
        updatedPreferences.budgetFormatted = "₹15L – ₹25L";
      }

      // Check if we have gathered enough to offer recommendations
      const filledCount = [
        updatedPreferences.budgetFormatted,
        updatedPreferences.fuelPreferences?.length,
        updatedPreferences.bodyTypes?.length,
        updatedPreferences.usage
      ].filter(Boolean).length;

      if (filledCount >= 3) {
        isReady = true;
        replyText = `Great insight! I've logged: **${updatedPreferences.bodyTypes?.[0] || "Vehicle"}** • **${updatedPreferences.fuelPreferences?.[0] || "Preferred Powertrain"}** • **${updatedPreferences.budgetFormatted || "Flexible Budget"}**.\n\nYour AI match analysis is ready to review. Would you like to view the recommendations or fine-tune further?`;
        chips = [
          { label: "🚀 View Recommended Cars", value: "VIEW_RESULTS", category: "action" },
          { label: "⚙️ Add More Requirements", value: "REFINE", category: "action" }
        ];
      } else {
        replyText = `Got it! I've updated your preferences with: "${input}".\n\nTo lock in the closest match, could you confirm your preferred body type or target price bracket?`;
        chips = chatConversationSteps[3].chips;
      }
    }

    return {
      replyMessage: {
        id: `msg-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: "Just now",
        chips,
        recommendationReady: isReady
      },
      updatedPreferences,
      nextStepIndex,
      isReady
    };
  },

  /**
   * Get initial conversation seed
   */
  getInitialState() {
    const firstStep = chatConversationSteps[0];
    return {
      messages: [
        {
          id: "msg-welcome-0",
          sender: "ai",
          text: firstStep.aiPrompt,
          timestamp: "Just now",
          chips: firstStep.chips
        }
      ],
      currentStepIndex: 0,
      suggestedQuestions
    };
  }
};
