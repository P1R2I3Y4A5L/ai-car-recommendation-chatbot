/**
 * Chat Data & Knowledge Base - AI Car Recommendation Chatbot
 */

export const chatConversationSteps = [
  {
    step: 1,
    key: "budget",
    aiPrompt: "Hello! I'm your AI Automotive Advisor. Let's find the ideal car for your lifestyle. To get started, **what is your target on-road budget?**",
    chips: [
      { label: "₹5L – ₹10L (Value)", value: { min: 500000, max: 1000000, label: "₹5L – ₹10L" }, category: "budget" },
      { label: "₹10L – ₹15L (Popular)", value: { min: 1000000, max: 1500000, label: "₹10L – ₹15L" }, category: "budget" },
      { label: "₹15L – ₹25L (Mid-SUV / Sedan)", value: { min: 1500000, max: 2500000, label: "₹15L – ₹25L" }, category: "budget" },
      { label: "₹25L – ₹50L (Executive)", value: { min: 2500000, max: 5000000, label: "₹25L – ₹50L" }, category: "budget" },
      { label: "₹50L+ (Luxury)", value: { min: 5000000, max: 12000000, label: "₹50L+" }, category: "budget" }
    ]
  },
  {
    step: 2,
    key: "usage",
    aiPrompt: "Got that budget registered! Next, **how will you mainly use this vehicle?** This helps me optimize between fuel economy, ground clearance, and highway poise.",
    chips: [
      { label: "🚗 Daily Commute (City traffic)", value: "Daily commute", category: "usage" },
      { label: "👨‍👩‍👦 Family & Weekend Outings", value: "Family", category: "usage" },
      { label: "🛣️ Long-Distance Highway Travel", value: "Long-distance travel", category: "usage" },
      { label: "⛰️ Off-Road & Mountain Expeditions", value: "Off-road", category: "usage" },
      { label: "💼 Business & Chauffeur Driven", value: "Business", category: "usage" },
      { label: "⚡ All-Round Mixed Usage", value: "Mixed", category: "usage" }
    ]
  },
  {
    step: 3,
    key: "fuel",
    aiPrompt: "Understood. Now, **which powertrain or fuel type do you prefer?** If you have charging access or commute heavily, an EV or Hybrid could save substantial fuel costs.",
    chips: [
      { label: "⚡ Electric (Zero emissions)", value: "Electric", category: "fuel" },
      { label: "🔋 Strong Hybrid (25+ km/l)", value: "Hybrid", category: "fuel" },
      { label: "⛽ Petrol (Smooth & punchy)", value: "Petrol", category: "fuel" },
      { label: "🛢️ Diesel (High torque cruiser)", value: "Diesel", category: "fuel" },
      { label: "🌿 CNG (Maximum savings)", value: "CNG", category: "fuel" }
    ]
  },
  {
    step: 4,
    key: "bodyType",
    aiPrompt: "Excellent choice. **Which vehicle body style do you envision driving?**",
    chips: [
      { label: "🚙 SUV / Compact SUV (High command)", value: "SUV", category: "bodyType" },
      { label: "🚘 Sedan (Aerodynamic comfort)", value: "Sedan", category: "bodyType" },
      { label: "🚗 Hatchback (Nimble urban parking)", value: "Hatchback", category: "bodyType" },
      { label: "🚐 MPV (Max 7-seater room)", value: "MPV", category: "bodyType" },
      { label: "🏎️ Coupe / Sporty Crossover", value: "Coupe", category: "bodyType" }
    ]
  },
  {
    step: 5,
    key: "transmission",
    aiPrompt: "Do you prefer an **automatic transmission for effortless stop-and-go traffic**, or a manual gearbox for tactile control?",
    chips: [
      { label: "🕹️ Automatic (DCT / CVT / Torque Converter)", value: "Automatic", category: "transmission" },
      { label: "🏎️ Manual (Pure driver engagement)", value: "Manual", category: "transmission" },
      { label: "👌 Open to Either", value: "Any", category: "transmission" }
    ]
  },
  {
    step: 6,
    key: "seating",
    aiPrompt: "How many passenger seats do you typically need on a daily or weekend basis?",
    chips: [
      { label: "5 Seater (Standard compact / mid)", value: 5, category: "seating" },
      { label: "6-7 Seater (3-row family setup)", value: 7, category: "seating" }
    ]
  },
  {
    step: 7,
    key: "features",
    aiPrompt: "Lastly, select the **priority features that matter most** to you:",
    chips: [
      { label: "🛡️ 5-Star NCAP Crash Safety", value: "5-Star Safety Rating", category: "priorityFeatures" },
      { label: "🤖 Level 2 ADAS (Auto Braking/Cruise)", value: "Level 2 ADAS", category: "priorityFeatures" },
      { label: "☀️ Panoramic Sunroof", value: "Panoramic Sunroof", category: "priorityFeatures" },
      { label: "💺 Ventilated Front Seats", value: "Ventilated Seats", category: "priorityFeatures" },
      { label: "📹 360-Degree Camera", value: "360-degree Camera", category: "priorityFeatures" },
      { label: "🎵 Premium Brand Audio (Bose/Sony/JBL)", value: "Premium Audio", category: "priorityFeatures" }
    ]
  }
];

export const initialChatMessages = [
  {
    id: "msg-welcome-1",
    sender: "ai",
    text: "Hello! I am your AI Automotive Consultant. I analyze your driving habits, family size, budget, and feature wishlist to recommend the best cars on the market.\n\nTo begin tailoring your recommendations, **what is your target budget?**",
    timestamp: "Just now",
    chips: chatConversationSteps[0].chips
  }
];

export const suggestedQuestions = [
  "What are the safest SUVs under ₹20 Lakhs?",
  "Recommend the best hybrid cars for high daily city commute",
  "Which 7-seater has the best automatic transmission?",
  "Show me electric cars with 400+ km real-world range"
];
