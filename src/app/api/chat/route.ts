import { NextRequest, NextResponse } from "next/server";
import { ChatRequestSchema } from "@/lib/validators";
import { extractPreferences, generateResponse } from "@/lib/gemini";
import { getRecommendations, resolveCarNames } from "@/lib/recommendation-engine";
import { searchCarsByName } from "@/lib/car-queries";
import { compareCars } from "@/lib/comparison-engine";
import type { ApiResponse, ChatResponse, CarSummary } from "@/types";

export const dynamic = "force-dynamic";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 50_000) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Request too large" },
      { status: 413 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: "Invalid request payload",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { message, sessionId, history } = parsed.data;

  try {
    const preferences = await extractPreferences(message, history);

    let cars: CarSummary[] = [];
    let comparisonTable = null;

    if (preferences.intent === "compare" && preferences.carNames && preferences.carNames.length >= 2) {
      const resolvedCars = await resolveCarNames(preferences.carNames);
      cars = resolvedCars;

      if (resolvedCars.length >= 2) {
        const ids = resolvedCars.map((c) => c.id);
        comparisonTable = await compareCars(ids);
      }
    } else if (preferences.intent === "detail" && preferences.carNames?.length) {
      cars = await searchCarsByName(preferences.carNames);
    } else {
      const ranked = await getRecommendations(preferences);
      cars = ranked.map((r) => r.car);
    }

    const aiResponse = await generateResponse(message, {
      cars,
      intent: preferences.intent,
      preferences,
      conversationHistory: history,
    });

    return NextResponse.json<ApiResponse<ChatResponse>>({
      success: true,
      data: {
        message: aiResponse,
        cars,
        comparisonTable,
        sessionId,
        intent: preferences.intent,
      },
    });
  } catch (err: unknown) {
    console.error("[POST /api/chat]", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";

    return NextResponse.json<ApiResponse<ChatResponse>>({
      success: true,
      data: {
        message: `Sorry, I encountered an issue: ${errorMessage}`,
        cars: [],
        comparisonTable: null,
        sessionId,
        intent: "unknown",
      },
    });
  }
}
