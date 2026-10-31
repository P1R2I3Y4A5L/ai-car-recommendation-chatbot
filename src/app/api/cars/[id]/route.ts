import { NextRequest, NextResponse } from "next/server";
import { getCarByIdOrSlug } from "@/lib/car-queries";
import type { ApiResponse, Car } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!id || id.length > 200) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Invalid car ID" },
        { status: 400 }
      );
    }

    const car = await getCarByIdOrSlug(id);

    if (!car) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: "Car not found" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<Car>>({
      success: true,
      data: car,
    });
  } catch (err) {
    console.error("[GET /api/cars/[id]]", err);
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: "Failed to fetch car details" },
      { status: 500 }
    );
  }
}
