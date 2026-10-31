jest.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn(),
  })),
}));

describe("Gemini Configuration and Safety Checks", () => {
  const originalKey = process.env.GEMINI_API_KEY;

  afterEach(() => {
    process.env.GEMINI_API_KEY = originalKey;
    jest.resetModules();
  });

  it("identifies when GEMINI_API_KEY is not configured", async () => {
    delete process.env.GEMINI_API_KEY;
    jest.resetModules();
    const { isGeminiConfigured } = await import("@/lib/gemini");
    expect(isGeminiConfigured()).toBe(false);
  });

  it("identifies when GEMINI_API_KEY is configured", async () => {
    process.env.GEMINI_API_KEY = "dummy-test-key";
    jest.resetModules();
    const { isGeminiConfigured } = await import("@/lib/gemini");
    expect(isGeminiConfigured()).toBe(true);
  });

  it("extractPreferences degrades gracefully without key", async () => {
    delete process.env.GEMINI_API_KEY;
    jest.resetModules();
    const { extractPreferences } = await import("@/lib/gemini");
    const result = await extractPreferences("Recommend an SUV", []);
    expect(result).toBeDefined();
    expect(result.intent).toBe("general");
  });
});
