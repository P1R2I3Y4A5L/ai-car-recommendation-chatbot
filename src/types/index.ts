// Vroomy — Shared TypeScript types
// These types are used across the entire application.

export type BodyType =
  | "sedan"
  | "suv"
  | "hatchback"
  | "mpv"
  | "coupe"
  | "convertible"
  | "pickup"
  | "crossover";

export type FuelType =
  | "petrol"
  | "diesel"
  | "electric"
  | "hybrid"
  | "cng"
  | "lpg";

export type TransmissionType =
  | "manual"
  | "automatic"
  | "amt"
  | "cvt"
  | "dct";

export type Market = "india" | "usa" | "europe" | "uk" | "global";

export type Currency = "INR" | "USD" | "EUR" | "GBP";

export type FeatureCategory =
  | "safety"
  | "comfort"
  | "infotainment"
  | "exterior"
  | "convenience";

// ─── Car types ──────────────────────────────────────────────────────────────

export interface CarSpec {
  engineCC: number | null;
  powerBhp: number | null;
  torqueNm: number | null;
  cylinderCount: number | null;
  mileageKmpl: number | null;
  electricRangeKm: number | null;
  batteryKwh: number | null;
  fuelTankLitres: number | null;
  seatingCapacity: number;
  bootLitres: number | null;
  lengthMm: number | null;
  widthMm: number | null;
  heightMm: number | null;
  wheelbaseMm: number | null;
  groundClearanceMm: number | null;
  topSpeedKmph: number | null;
  zeroToHundredSec: number | null;
  ncapRating: number | null;
  ncapSource: string | null;
  warrantyYears: number | null;
  warrantyKm: number | null;
  lastVerified: string;
  sourceUrl: string | null;
}

export interface CarFeature {
  id: string;
  category: FeatureCategory;
  name: string;
  standard: boolean;
  optional: boolean;
}

export interface CarVariant {
  id: string;
  name: string;
  priceMin: number | null;
  priceMax: number | null;
  fuelType: string | null;
  transmission: string | null;
  isBaseVariant: boolean;
}

export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
  market: string;
  currency: string;
  priceMin: number;
  priceMax: number;
  priceUnit: string;
  imageUrl: string | null;
  description: string;
  isDemo: boolean;
  specs: CarSpec | null;
  variants: CarVariant[];
  features: CarFeature[];
}

export interface CarSummary {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
  market: string;
  currency: string;
  priceMin: number;
  priceMax: number;
  priceUnit: string;
  imageUrl: string | null;
  description: string;
  isDemo?: boolean;
  seatingCapacity: number | null;
  mileageKmpl: number | null;
  electricRangeKm: number | null;
  ncapRating: number | null;
}

// ─── Filter types ────────────────────────────────────────────────────────────

export interface CarFilters {
  brand?: string;
  bodyType?: string;
  fuelType?: string;
  transmission?: string;
  market?: string;
  currency?: string;
  budgetMin?: number;
  budgetMax?: number;
  seatingCapacity?: number;
  minMileage?: number;
  minElectricRange?: number;
  page?: number;
  limit?: number;
  sortBy?: "price_asc" | "price_desc" | "mileage_desc" | "name_asc";
}

export interface PaginatedCars {
  cars: CarSummary[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─── Chat types ───────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  cars?: CarSummary[];
  comparisonTable?: ComparisonData | null;
  timestamp: number;
  isError?: boolean;
}

export interface ChatRequest {
  message: string;
  sessionId: string;
  history: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>;
}

export interface ChatResponse {
  message: string;
  cars: CarSummary[];
  comparisonTable: ComparisonData | null;
  sessionId: string;
  intent: ChatIntent;
}

export type ChatIntent =
  | "recommend"
  | "compare"
  | "detail"
  | "clarify"
  | "general"
  | "unknown";

// ─── Comparison types ─────────────────────────────────────────────────────────

export interface ComparisonField {
  key: string;
  label: string;
  values: Array<string | number | null>;
  unit?: string;
  higherIsBetter?: boolean;
  lowerIsBetter?: boolean;
}

export interface ComparisonData {
  cars: CarSummary[];
  fields: ComparisonField[];
  summary: string;
}

// ─── API response types ───────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  details?: unknown;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─── AI extracted preferences ─────────────────────────────────────────────────

export interface ExtractedPreferences {
  intent: ChatIntent;
  filters: Partial<CarFilters>;
  carNames?: string[];  // for comparison or detail requests
  clarificationNeeded?: string;
}
