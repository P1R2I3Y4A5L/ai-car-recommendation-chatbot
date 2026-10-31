import type { Car } from "@/types";

jest.mock("@/lib/db", () => ({
  db: {},
}));

jest.mock("@/lib/car-queries", () => ({
  getCarsByIds: jest.fn(),
}));

import { compareCars } from "@/lib/comparison-engine";
import { getCarsByIds } from "@/lib/car-queries";

const mockGetCarsByIds = getCarsByIds as jest.MockedFunction<typeof getCarsByIds>;

const baseCar = (overrides: Partial<Car> = {}): Car => ({
  id: "1",
  slug: "test-car",
  name: "Test Car",
  brand: "Test Brand",
  model: "Test Model",
  year: 2024,
  bodyType: "suv",
  fuelType: "petrol",
  transmission: "manual",
  market: "india",
  currency: "INR",
  priceMin: 10,
  priceMax: 15,
  priceUnit: "lakh",
  imageUrl: null,
  description: "A test car",
  isDemo: true,
  specs: {
    engineCC: 1498,
    powerBhp: 110,
    torqueNm: 170,
    cylinderCount: 4,
    mileageKmpl: 17.4,
    electricRangeKm: null,
    batteryKwh: null,
    fuelTankLitres: 44,
    seatingCapacity: 5,
    bootLitres: 350,
    lengthMm: 3993,
    widthMm: 1811,
    heightMm: 1607,
    wheelbaseMm: 2498,
    groundClearanceMm: 208,
    topSpeedKmph: 180,
    zeroToHundredSec: 10.5,
    ncapRating: 5,
    ncapSource: "Global NCAP",
    warrantyYears: 3,
    warrantyKm: 100000,
    lastVerified: "2024-01-01T00:00:00.000Z",
    sourceUrl: null,
  },
  variants: [],
  features: [],
  ...overrides,
});

const nexon: Car = baseCar({
  id: "1",
  slug: "tata-nexon-petrol",
  name: "Tata Nexon Petrol",
  brand: "Tata",
  priceMin: 8,
  priceMax: 15,
});

const creta: Car = baseCar({
  id: "2",
  slug: "hyundai-creta-petrol",
  name: "Hyundai Creta Petrol",
  brand: "Hyundai",
  priceMin: 11,
  priceMax: 20,
});

describe("Comparison Engine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("compareCars()", () => {
    it("returns null if fewer than 2 IDs are provided", async () => {
      const result = await compareCars(["1"]);
      expect(result).toBeNull();
    });

    it("returns null if fewer than 2 cars exist in database", async () => {
      mockGetCarsByIds.mockResolvedValue([nexon]);
      const result = await compareCars(["1", "2"]);
      expect(result).toBeNull();
    });

    it("returns structured comparison table for valid cars", async () => {
      mockGetCarsByIds.mockResolvedValue([nexon, creta]);
      const result = await compareCars(["1", "2"]);

      expect(result).not.toBeNull();
      expect(result!.cars).toHaveLength(2);
      expect(result!.fields.length).toBeGreaterThan(0);
      expect(typeof result!.summary).toBe("string");
    });

    it("includes price and seating fields", async () => {
      mockGetCarsByIds.mockResolvedValue([nexon, creta]);
      const result = await compareCars(["1", "2"]);

      const priceField = result!.fields.find((f) => f.key === "price");
      const seatingField = result!.fields.find((f) => f.key === "seating");

      expect(priceField).toBeDefined();
      expect(seatingField).toBeDefined();
    });
  });
});
