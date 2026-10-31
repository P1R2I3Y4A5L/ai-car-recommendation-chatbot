import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ExtractedPreferences, ChatIntent } from "@/types";

let _genAI: GoogleGenerativeAI | null = null;

export function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY;
  return Boolean(key && key.trim() !== "" && key !== "your_gemini_api_key_here");
}

function getGenAI(): GoogleGenerativeAI {
  const key = process.env.GEMINI_API_KEY;
  if (!isGeminiConfigured() || !key) {
    throw new Error(
      "GEMINI_API_KEY is not configured or still set to default placeholder. " +
        "Please add a valid key from https://aistudio.google.com/app/apikey to C:\\vroomy\\.env"
    );
  }
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(key);
  }
  return _genAI;
}

// ─── Keyword fallback parser when API key is not configured or fails ─────────
export function extractPreferencesFallback(userMessage: string): ExtractedPreferences {
  const msg = userMessage.toLowerCase();
  const filters: ExtractedPreferences["filters"] = {};
  let intent: ChatIntent = "recommend";
  const carNames: string[] = [];

  // Comparison intent check
  if (msg.includes("compare") || msg.includes(" vs ") || msg.includes(" versus ")) {
    intent = "compare";
  } else if (msg.includes("spec") || msg.includes("detail") || msg.includes("feature")) {
    intent = "detail";
  }

  // Budget detection (e.g. "under 15 lakh", "under 10 lakhs", "15 lakh")
  const lakhMatch = msg.match(/(?:under|below|budget|upto|within)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs)/i);
  if (lakhMatch) {
    filters.budgetMax = parseFloat(lakhMatch[1]);
  }

  // Seating capacity
  if (msg.includes("7 seater") || msg.includes("7-seater") || msg.includes("seven seater") || msg.includes("family")) {
    filters.seatingCapacity = 7;
  } else if (msg.includes("5 seater") || msg.includes("5-seater")) {
    filters.seatingCapacity = 5;
  }

  // Body type
  if (msg.includes("suv")) filters.bodyType = "suv";
  else if (msg.includes("sedan")) filters.bodyType = "sedan";
  else if (msg.includes("hatchback")) filters.bodyType = "hatchback";
  else if (msg.includes("mpv")) filters.bodyType = "mpv";

  // Fuel type
  if (msg.includes("electric") || msg.includes(" ev ")) filters.fuelType = "electric";
  else if (msg.includes("diesel")) filters.fuelType = "diesel";
  else if (msg.includes("petrol")) filters.fuelType = "petrol";
  else if (msg.includes("cng")) filters.fuelType = "cng";
  else if (msg.includes("hybrid")) filters.fuelType = "hybrid";

  // Car model names detection for compare / detail
  const knownCars = [
    "nexon", "creta", "swift", "city", "scorpio", "ertiga",
    "innova", "i20", "punch", "seltos", "camry", "model 3", "3 series"
  ];
  for (const car of knownCars) {
    if (msg.includes(car)) {
      carNames.push(car);
    }
  }

  if (carNames.length >= 2 && intent !== "compare") {
    intent = "compare";
  }

  return {
    intent,
    filters,
    carNames: carNames.length > 0 ? carNames : undefined,
  };
}

// ─── Prompt definitions ───────────────────────────────────────────────────────

const EXTRACT_PREFERENCES_PROMPT = `You are Vroomy's car preference extractor. 
Extract structured car-buying preferences from the user's message.

Respond ONLY with a valid JSON object. No markdown, no explanation.

JSON schema:
{
  "intent": "recommend" | "compare" | "detail" | "clarify" | "general" | "unknown",
  "filters": {
    "brand": string | null,
    "bodyType": "sedan" | "suv" | "hatchback" | "mpv" | "coupe" | "convertible" | "pickup" | "crossover" | null,
    "fuelType": "petrol" | "diesel" | "electric" | "hybrid" | "cng" | "lpg" | null,
    "transmission": "manual" | "automatic" | "amt" | "cvt" | "dct" | null,
    "market": "india" | "usa" | "europe" | "uk" | "global" | null,
    "budgetMax": number | null,
    "budgetMin": number | null,
    "seatingCapacity": number | null,
    "minMileage": number | null,
    "minElectricRange": number | null
  },
  "carNames": string[] | null,
  "clarificationNeeded": string | null
}

Rules:
- budgetMax/budgetMin for Indian cars: value in LAKHS (e.g. "15 lakh" = 15, "1 crore" = 100)
- budgetMax/budgetMin for USD cars: value in THOUSANDS (e.g. "$40,000" = 40)
- If user says "family car" or "7-seater", set seatingCapacity to 7
- For comparison requests, populate carNames array with car models mentioned
- Default market to "india" unless user specifies otherwise`;

const GENERATE_RESPONSE_PROMPT = `You are Vroomy, a knowledgeable and friendly automotive assistant.
Provide accurate information ONLY from the database results provided.
Be concise, helpful, and transparent.
Do not invent specifications, prices, or ratings not present in the data.
Format your response in plain text with clear recommendations.`;

// ─── Extract preferences from user message ────────────────────────────────────

export async function extractPreferences(
  userMessage: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  conversationHistory: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>
): Promise<ExtractedPreferences> {
  if (!isGeminiConfigured()) {
    return extractPreferencesFallback(userMessage);
  }

  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${EXTRACT_PREFERENCES_PROMPT}\n\nUser message: "${userMessage}"`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 512,
      },
    });

    const text = result.response.text().trim();
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return {
      intent: (parsed.intent as ChatIntent) ?? "unknown",
      filters: parsed.filters ?? {},
      carNames: parsed.carNames ?? undefined,
      clarificationNeeded: parsed.clarificationNeeded ?? undefined,
    };
  } catch (err) {
    console.warn("Gemini preference extraction failed, falling back to local extractor:", err);
    return extractPreferencesFallback(userMessage);
  }
}

// ─── Generate AI response with database context ───────────────────────────────

export async function generateResponse(
  userMessage: string,
  context: {
    cars: Array<{ name: string; brand: string; priceMin: number; priceMax: number; priceUnit: string; currency: string; fuelType: string; bodyType: string; seatingCapacity?: number | null; mileageKmpl?: number | null; electricRangeKm?: number | null; ncapRating?: number | null; description?: string }>;
    intent: string;
    preferences: ExtractedPreferences;
    conversationHistory: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>;
  }
): Promise<string> {
  if (!isGeminiConfigured()) {
    // Rule-based fallback summary when API key is not supplied
    if (context.cars.length === 0) {
      return "I couldn't find any vehicles in our database matching your exact criteria. Try adjusting your budget or relaxing the body/fuel type filter.";
    }

    if (context.intent === "compare") {
      const names = context.cars.map((c) => c.name).join(" vs ");
      return `Here is the side-by-side comparison for ${names}. Review the technical specifications, pricing, and safety ratings below to compare their strengths.`;
    }

    const topCar = context.cars[0];
    const priceStr = topCar.currency === "INR" ? `₹${topCar.priceMin}–${topCar.priceMax} ${topCar.priceUnit}` : `$${topCar.priceMin * 1000}–$${topCar.priceMax * 1000}`;
    return `Based on our verified database, here are the top recommended vehicles matching your request! Top match: **${topCar.name}** starting from ${priceStr}. Explore the clickable vehicle cards below for full specs:`;
  }

  try {
    const genAI = getGenAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const contextText =
      context.cars.length > 0
        ? `\n\nAvailable cars from database:\n${JSON.stringify(context.cars, null, 2)}`
        : "\n\nNo matching cars found in the database.";

    const systemContext = `${GENERATE_RESPONSE_PROMPT}\n\nUser intent: ${context.intent}${contextText}`;

    const contents = [
      ...context.conversationHistory,
      {
        role: "user" as const,
        parts: [{ text: `${systemContext}\n\nUser: ${userMessage}` }],
      },
    ];

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    return result.response.text();
  } catch (err: unknown) {
    console.error("Gemini API call failed:", err);
    
    // Return friendly database-grounded response instead of error crash
    if (context.cars.length > 0) {
      const topCar = context.cars[0];
      return `Here are the top verified options from our database matching your query (e.g., ${topCar.name}). Check out the car cards below for full specifications and pricing:`;
    }
    return "I couldn't generate a response due to an AI service error. Please verify your GEMINI_API_KEY in .env or try again.";
  }
}
