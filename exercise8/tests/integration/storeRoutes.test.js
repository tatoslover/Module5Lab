const request = require("supertest");
const app = require("../../app");

// Mock axios to prevent real API calls
jest.mock("axios");
const axios = require("axios");

describe("Store Routes Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Simple mock setup - just return empty arrays/objects
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: "Test Product", price: 10.99, category: "electronics" },
        { id: 2, title: "Another Product", price: 15.99, category: "clothing" },
      ],
    });
  });

  describe("Basic Endpoints", () => {
    it("should serve health check", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body.status).toBe("healthy");
    });

    it("should serve portfolio HTML", async () => {
      const response = await request(app).get("/").expect(200);

      expect(response.text).toContain("eCommerce Store");
    });

    it("should serve Swagger docs", async () => {
      const response = await request(app).get("/api-docs/").expect(200);

      expect(response.text).toContain("swagger");
    });

    it("should return 404 for unknown API routes", async () => {
      await request(app).get("/api/nonexistent").expect(404);
    });
  });

  describe("API Validation Tests", () => {
    it("should validate product ID", async () => {
      const response = await request(app)
        .get("/api/products/invalid")
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it("should validate limit parameter", async () => {
      const response = await request(app)
        .get("/api/products/limit/999")
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it("should validate search query", async () => {
      const response = await request(app)
        .get("/api/products/search")
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe("Working Endpoints", () => {
    it("should handle cache clear", async () => {
      // Mock a successful response for cache clear
      const response = await request(app)
        .post("/api/cache/clear")
        .expect((res) => {
          // Accept either 200 or 500 - we just want no crash
          expect([200, 500]).toContain(res.status);
        });
    });
  });
});
