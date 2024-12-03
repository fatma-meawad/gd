require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

// Import the necessary module for unit tests
const { getAdmins } = require("../../db/admins.db");

// Mock the getAdmins function
jest.mock("../../db/admins.db", () => ({
  getAdmins: jest.fn(),
}));

describe("Test suite for /s1/admins", () => {
  // ===== INTEGRATION TESTS FOR /s1/admins =====
  describe("GET /s1/admins", () => {
    // Test case for valid inputs
    test("Should return 200 OK when valid 'page' and 'limit' are provided", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1,
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body).toHaveProperty("page", 1);
      expect(response.body).toHaveProperty("limit", 10);
    });

    // Test case when 'page' is missing
    test("Should return 200 OK and use default 'page' when 'page' is missing", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("page", 1); // Assuming default page is 1
    });

    // Test case when 'limit' is missing
    test("Should return 200 OK and use default 'limit' when 'limit' is missing", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("limit", 10); // Assuming default limit is 10
    });

    // Test case when both 'page' and 'limit' are missing
    test("Should return 200 OK and use default 'page' and 'limit' when both are missing", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("page", 1);
      expect(response.body).toHaveProperty("limit", 10);
    });

    test("Should return 200 OK when 'page' and 'limit' are numeric strings", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: "2",
          limit: "5",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("page", 2);
      expect(response.body).toHaveProperty("limit", 5);
    });

    // ===== VALIDATION TESTS (Should pass in Phase 1) =====

    test("Should return 400 Bad Request when 'page' is zero", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 0,
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "minimum.openapi.validation",
        message: "must be >= 1",
        path: "/query/page",
      });
    });

    test("Should return 400 Bad Request when 'limit' is zero", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1,
          limit: 0,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "minimum.openapi.validation",
        message: "must be >= 1",
        path: "/query/limit",
      });
    });

    test("Should return 400 Bad Request when 'page' is negative", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: -1,
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "minimum.openapi.validation",
        message: "must be >= 1",
        path: "/query/page",
      });
    });

    test("Should return 400 Bad Request when 'limit' is negative", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1,
          limit: -5,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "minimum.openapi.validation",
        message: "must be >= 1",
        path: "/query/limit",
      });
    });

    test("Should return 400 Bad Request when 'page' exceeds maximum value", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1001,
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "maximum.openapi.validation",
        message: "must be <= 1000",
        path: "/query/page",
      });
    });

    test("Should return 400 Bad Request when 'limit' exceeds maximum value", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1,
          limit: 101,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "maximum.openapi.validation",
        message: "must be <= 100",
        path: "/query/limit",
      });
    });

    test("Should return 400 Bad Request when 'page' and 'limit' are extremely large numbers", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 999999999999,
          limit: 999999999999,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "maximum.openapi.validation",
        message: expect.stringMatching(/must be <= (100|1000)/),
        path: expect.stringMatching(/\/query\/(page|limit)/),
      });
    });
  });
});
