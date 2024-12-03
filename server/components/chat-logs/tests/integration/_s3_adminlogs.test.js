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
          admin_id: 101,
          keyword: "Edited",
          date_range: "2023-11-01:2023-11-30",
          sort_by: "date",
          order: "asc",
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
      // Additional assertions based on expected data structure
    });

    // Negative Test Case: Invalid admin_id (non-integer)
    test("Should return 400 when admin_id is not an integer", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ admin_id: "abc" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "type.openapi.validation",
        message: "must be integer",
        path: "/query/admin_id",
      });
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
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "maxLength.openapi.validation",
        message: "must NOT have more than 100 characters",
        path: "/query/keyword",
      });
    });

    // Negative Test Case: Invalid date_range Length
    test("Should return 400 when date_range format is invalid", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ date_range: "2023-01-01_to_2023-12-31" }) // Invalid format
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "maxLength.openapi.validation",
        message: 'must NOT have more than 21 characters',
        path: "/query/date_range",
      });
    });

    // Negative Test Case: Invalid date_range format
    test("Should return 400 when date_range format is invalid", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ date_range: "2023-01-01-2023-12-31" }) // Invalid format
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "pattern.openapi.validation",
        message: 'must match pattern "^\\d{4}-\\d{2}-\\d{2}:\\d{4}-\\d{2}-\\d{2}$"',
        path: "/query/date_range",
      });
    });

    // Negative Test Case: Invalid sort_by value
    test("Should return 400 when sort_by is not one of the allowed values", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ sort_by: "invalid_field" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "enum.openapi.validation",
        message: 'must be equal to one of the allowed values: date, keyword, admin_id',
        path: "/query/sort_by",
      });
    });

    // Negative Test Case: Invalid order value
    test("Should return 400 when order is not 'asc' or 'desc'", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({ order: "up" })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "enum.openapi.validation",
        message: 'must be equal to one of the allowed values: asc, desc',
        path: "/query/order",
      });
    });

    // Negative Test Case: No logs found
    test("Should return 404 when no logs are found for the specified criteria", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .query({
          admin_id: 9999, // Assuming this admin_id does not exist
        })
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toContain("No logs found");
    });

    // Positive Test Case: Valid request with minimal parameters
    test("Should return 200 and data when only required parameters are provided", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s3/adminlogs`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
