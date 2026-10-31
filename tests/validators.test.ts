import {
  CarFiltersSchema,
  CompareRequestSchema,
  ChatRequestSchema,
} from "@/lib/validators";

describe("CarFiltersSchema", () => {
  it("accepts valid filter params", () => {
    const result = CarFiltersSchema.safeParse({
      bodyType: "suv",
      fuelType: "petrol",
      budgetMax: "15",
      page: "1",
      limit: "12",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bodyType).toBe("suv");
      expect(result.data.budgetMax).toBe(15);
      expect(result.data.page).toBe(1);
    }
  });

  it("rejects unsupported vehicle body types", () => {
    const result = CarFiltersSchema.safeParse({ bodyType: "airplane" });
    expect(result.success).toBe(false);
  });

  it("coerces numerical inputs cleanly", () => {
    const result = CarFiltersSchema.safeParse({ budgetMax: "25", seatingCapacity: "7" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.budgetMax).toBe(25);
      expect(result.data.seatingCapacity).toBe(7);
    }
  });
});

describe("CompareRequestSchema", () => {
  it("validates 2 to 4 IDs for comparison", () => {
    expect(CompareRequestSchema.safeParse({ ids: ["id1", "id2"] }).success).toBe(true);
    expect(CompareRequestSchema.safeParse({ ids: ["id1", "id2", "id3", "id4"] }).success).toBe(true);
    expect(CompareRequestSchema.safeParse({ ids: ["id1"] }).success).toBe(false);
    expect(CompareRequestSchema.safeParse({ ids: ["1", "2", "3", "4", "5"] }).success).toBe(false);
  });
});

describe("ChatRequestSchema", () => {
  it("validates standard user query payload", () => {
    const result = ChatRequestSchema.safeParse({
      message: "Find an electric car under 20 lakh",
      sessionId: "session-abc-123",
      history: [],
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty or overlong message text", () => {
    expect(ChatRequestSchema.safeParse({ message: "", sessionId: "1", history: [] }).success).toBe(false);
    expect(ChatRequestSchema.safeParse({ message: "x".repeat(2001), sessionId: "1", history: [] }).success).toBe(false);
  });
});
