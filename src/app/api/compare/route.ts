import { NextRequest, NextResponse } from "next/server";
import { compareCars } from "@/lib/comparison-engine";
import { CompareRequestSchema } from "@/lib/validators";
import type { ApiResponse, ComparisonData } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10_000) {
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

    const parsed = CompareRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: "Invalid request: provide 2–4 car IDs in an 'ids' array",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const result = await compareCars(parsed.data.ids);
    if (!result) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: "Could not find enough cars for comparison. Please check the car IDs.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<ComparisonData>>({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("[POST /api/compare]", err);
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to compare cars" },
      { status: 500 }
    );
  }
}
