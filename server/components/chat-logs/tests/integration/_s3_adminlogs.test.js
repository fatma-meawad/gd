// adminlogs.test.js
require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(`${ROOT_DIR}/app`);
const baseUrl = process.env.BASE_API_TEST_URL;

describe("Integration Tests for /s3/adminlogs", () => {
  describe("GET /s3/adminlogs", () => {
    // Positive Test Case: Valid request with all parameters
    test("Should return 200 and data when valid query parameters are provided", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({
          admin_id: 1,
          keyword: "edit",
          date_range: "2023-01-01:2023-12-31",
          sort_by: "date",
          order: "asc",
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toHaveProperty("data");
      // Additional assertions can be made based on expected data structure
    });

    // Negative Test Case: Invalid admin_id (non-integer)
    test("Should return 400 when admin_id is not an integer", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ admin_id: "abc" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0].message).toContain("admin_id");
    });

    // Negative Test Case: Exceeding maxLength for keyword
    test("Should return 400 when keyword exceeds maxLength", async () => {
      const longKeyword = "a".repeat(101); // 101 characters
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ keyword: longKeyword })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0].message).toContain("keyword");
    });

    // Negative Test Case: Invalid date_range format
    test("Should return 400 when date_range format is invalid", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ date_range: "2023-01-01_to_2023-12-31" }) // Invalid format
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0].message).toContain("date_range");
    });

    // Negative Test Case: Invalid sort_by value
    test("Should return 400 when sort_by is not one of the allowed values", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ sort_by: "invalid_field" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0].message).toContain("sort_by");
    });

    // Negative Test Case: Invalid order value
    test("Should return 400 when order is not 'asc' or 'desc'", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ order: "up" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0].message).toContain("order");
    });
  });

});
