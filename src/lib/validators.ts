import { z } from "zod";

// ─── Request validators ───────────────────────────────────────────────────────

export const CarFiltersSchema = z.object({
  brand: z.string().optional(),
  bodyType: z
    .enum(["sedan", "suv", "hatchback", "mpv", "coupe", "convertible", "pickup", "crossover"])
    .optional(),
  fuelType: z
    .enum(["petrol", "diesel", "electric", "hybrid", "cng", "lpg"])
    .optional(),
  transmission: z
    .enum(["manual", "automatic", "amt", "cvt", "dct"])
    .optional(),
  market: z.enum(["india", "usa", "europe", "uk", "global"]).optional(),
  currency: z.enum(["INR", "USD", "EUR", "GBP"]).optional(),
  budgetMin: z.coerce.number().min(0).optional(),
  budgetMax: z.coerce.number().min(0).optional(),
  seatingCapacity: z.coerce.number().min(2).max(15).optional(),
  minMileage: z.coerce.number().min(0).optional(),
  minElectricRange: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
  sortBy: z
    .enum(["price_asc", "price_desc", "mileage_desc", "name_asc"])
    .optional(),
});

export const CarIdSchema = z.object({
  id: z.string().min(1).max(100),
});

export const CompareRequestSchema = z.object({
  ids: z.array(z.string().min(1).max(100)).min(2).max(4),
});

export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  sessionId: z.string().min(1).max(100),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "model"]),
        parts: z.array(z.object({ text: z.string() })),
      })
    )
    .max(20)
    .default([]),
});

// ─── Type exports ─────────────────────────────────────────────────────────────

export type CarFiltersInput = z.infer<typeof CarFiltersSchema>;
export type CompareRequestInput = z.infer<typeof CompareRequestSchema>;
export type ChatRequestInput = z.infer<typeof ChatRequestSchema>;
