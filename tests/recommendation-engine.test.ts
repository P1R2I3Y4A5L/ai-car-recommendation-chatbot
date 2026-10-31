import type { CarSummary, ExtractedPreferences } from "@/types";

jest.mock("@/lib/db", () => ({
  db: {},
}));

jest.mock("@/lib/car-queries", () => ({
  listCars: jest.fn(),
  searchCarsByName: jest.fn(),
}));

import { getRecommendations } from "@/lib/recommendation-engine";
import { listCars } from "@/lib/car-queries";

const mockListCars = listCars as jest.MockedFunction<typeof listCars>;

const mockCars: CarSummary[] = [
  {
    id: "1",
    slug: "tata-nexon-petrol",
    name: "Tata Nexon Petrol",
    brand: "Tata",
    model: "Nexon",
    year: 2024,
    bodyType: "suv",
    fuelType: "petrol",
    transmission: "manual",
    market: "india",
    currency: "INR",
    priceMin: 8,
    priceMax: 15,
    priceUnit: "lakh",
    imageUrl: null,
    description: "Popular compact SUV",
    seatingCapacity: 5,
    mileageKmpl: 17.4,
    electricRangeKm: null,
    ncapRating: 5,
  },
  {
    id: "2",
    slug: "hyundai-creta-petrol",
    name: "Hyundai Creta Petrol",
    brand: "Hyundai",
    model: "Creta",
    year: 2024,
    bodyType: "suv",
    fuelType: "petrol",
    transmission: "automatic",
    market: "india",
    currency: "INR",
    priceMin: 11,
    priceMax: 20,
    priceUnit: "lakh",
    imageUrl: null,
    description: "Feature-rich SUV",
    seatingCapacity: 5,
    mileageKmpl: 17.4,
    electricRangeKm: null,
    ncapRating: null,
  },
  {
    id: "3",
    slug: "maruti-swift-petrol",
    name: "Maruti Suzuki Swift",
    brand: "Maruti Suzuki",
    model: "Swift",
    year: 2024,
    bodyType: "hatchback",
    fuelType: "petrol",
    transmission: "manual",
    market: "india",
    currency: "INR",
    priceMin: 6.5,
    priceMax: 9.5,
    priceUnit: "lakh",
    imageUrl: null,
    description: "Fuel-efficient hatchback",
    seatingCapacity: 5,
    mileageKmpl: 24.8,
    electricRangeKm: null,
    ncapRating: null,
  },
  {
    id: "4",
    slug: "tata-nexon-ev",
    name: "Tata Nexon EV",
    brand: "Tata",
    model: "Nexon EV",
    year: 2024,
    bodyType: "suv",
    fuelType: "electric",
    transmission: "automatic",
    market: "india",
    currency: "INR",
    priceMin: 14.5,
    priceMax: 19,
    priceUnit: "lakh",
    imageUrl: null,
    description: "Electric compact SUV",
    seatingCapacity: 5,
    mileageKmpl: null,
    electricRangeKm: 465,
    ncapRating: 5,
  },
  {
    id: "5",
    slug: "toyota-innova-crysta-diesel",
    name: "Toyota Innova Crysta Diesel",
    brand: "Toyota",
    model: "Innova Crysta",
    year: 2024,
    bodyType: "mpv",
    fuelType: "diesel",
    transmission: "manual",
    market: "india",
    currency: "INR",
    priceMin: 19.5,
    priceMax: 26.5,
    priceUnit: "lakh",
    imageUrl: null,
    description: "Reliable 7-seater MPV",
    seatingCapacity: 7,
    mileageKmpl: 15.1,
    electricRangeKm: null,
    ncapRating: null,
  },
];

describe("Recommendation Engine", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockListCars.mockResolvedValue({
      cars: mockCars,
      total: mockCars.length,
      page: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    });
  });

  describe("Budget filtering & scoring", () => {
    it("returns cars within budget", async () => {
      const prefs: ExtractedPreferences = {
        intent: "recommend",
        filters: { budgetMax: 15, market: "india" },
      };

      const results = await getRecommendations(prefs);
      expect(results.length).toBeGreaterThan(0);
      results.forEach((r) => {
        expect(r.car.priceMin).toBeLessThanOrEqual(15);
      });
    });

    it("ranks cars based on requirements", async () => {
      const prefs: ExtractedPreferences = {
        intent: "recommend",
        filters: { budgetMax: 10 },
      };

      const results = await getRecommendations(prefs);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].car.priceMin).toBeLessThanOrEqual(10);
    });
  });

  describe("Body type filtering", () => {
    it("scores SUVs higher when body type is suv", async () => {
      const prefs: ExtractedPreferences = {
        intent: "recommend",
        filters: { bodyType: "suv" },
      };

      const results = await getRecommendations(prefs, 5);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].car.bodyType).toBe("suv");
    });
  });

  describe("Seating capacity requirements", () => {
    it("recommends 7-seater when seatingCapacity is 7", async () => {
      const prefs: ExtractedPreferences = {
        intent: "recommend",
        filters: { seatingCapacity: 7 },
      };

      const results = await getRecommendations(prefs, 5);
      const innova = results.find((r) => r.car.seatingCapacity === 7);
      expect(innova).toBeDefined();
      expect(innova!.score).toBeGreaterThan(0);
    });
  });

  describe("Fuel type alignment", () => {
    it("favors electric vehicles when electric is chosen", async () => {
      const prefs: ExtractedPreferences = {
        intent: "recommend",
        filters: { fuelType: "electric" },
      };

      const results = await getRecommendations(prefs, 5);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].car.fuelType).toBe("electric");
    });
  });

  describe("Result ordering", () => {
    it("orders recommendations by score descending", async () => {
      const prefs: ExtractedPreferences = {
        intent: "recommend",
        filters: { bodyType: "suv", budgetMax: 20 },
      };

      const results = await getRecommendations(prefs, 5);
      for (let i = 1; i < results.length; i++) {
        expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
      }
    });
  });

  describe("Empty catalog handling", () => {
    it("handles zero matches gracefully", async () => {
      mockListCars.mockResolvedValue({
        cars: [],
        total: 0,
        page: 1,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });

      const prefs: ExtractedPreferences = {
        intent: "recommend",
        filters: { budgetMax: 1 },
      };

      const results = await getRecommendations(prefs);
      expect(results).toEqual([]);
    });
  });
});
