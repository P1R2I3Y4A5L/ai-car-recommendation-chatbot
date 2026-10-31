import { NextRequest, NextResponse } from "next/server";
import { listCars } from "@/lib/car-queries";
import { CarFiltersSchema } from "@/lib/validators";
import type { ApiResponse, PaginatedCars } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = request.nextUrl;
    const raw = Object.fromEntries(searchParams.entries());

    const parsed = CarFiltersSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: "Invalid filter parameters",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const result = await listCars(parsed.data);

    return NextResponse.json<ApiResponse<PaginatedCars>>({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("[GET /api/cars]", err);
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
