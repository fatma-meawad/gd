require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

describe("Test suite for /s1/admins", () => {
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

    // Test case when 'page' is zero
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
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'page' must be greater than or equal to 1"),
        })
      );
    });

    // Test case when 'limit' is zero
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
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'limit' must be greater than or equal to 1"),
        })
      );
    });

    // Test case when 'page' is negative
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
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'page' must be greater than or equal to 1"),
        })
      );
    });

    // Test case when 'limit' is negative
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
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'limit' must be greater than or equal to 1"),
        })
      );
    });

    // Test case when 'page' exceeds maximum value
    test("Should return 400 Bad Request when 'page' exceeds maximum value", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1001, // Assuming maximum page is 1000
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'page' must be less than or equal to 1000"),
        })
      );
    });

    // Test case when 'limit' exceeds maximum value
    test("Should return 400 Bad Request when 'limit' exceeds maximum value", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1,
          limit: 101, // Assuming maximum limit is 100
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'limit' must be less than or equal to 100"),
        })
      );
    });

    // Test case when 'page' is not a number
    test("Should return 400 Bad Request when 'page' is not a number", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: "one",
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'page' must be an integer"),
        })
      );
    });

    // Test case when 'limit' is not a number
    test("Should return 400 Bad Request when 'limit' is not a number", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1,
          limit: "ten",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'limit' must be an integer"),
        })
      );
    });

    // Test case when 'page' is a decimal number
    test("Should return 400 Bad Request when 'page' is a decimal number", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1.5,
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'page' must be an integer"),
        })
      );
    });

    // Test case when 'limit' is a decimal number
    test("Should return 400 Bad Request when 'limit' is a decimal number", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1,
          limit: 10.5,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'limit' must be an integer"),
        })
      );
    });

    // Test case when 'page' is an array
    test("Should return 400 Bad Request when 'page' is an array", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins?page[]=1&page[]=2")
        .set("Accept", "application/json")
        .query({
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'page' must be a single integer value"),
        })
      );
    });

    // Test case when 'limit' is an array
    test("Should return 400 Bad Request when 'limit' is an array", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins?limit[]=10&limit[]=20")
        .set("Accept", "application/json")
        .query({
          page: 1,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("'limit' must be a single integer value"),
        })
      );
    });

    // Test case when extra unexpected query parameters are provided
    test("Should return 400 Bad Request when unexpected query parameters are provided", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1,
          limit: 10,
          sort: "asc", // Assuming 'sort' is not an accepted parameter
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: expect.stringContaining("Unexpected query parameter 'sort'"),
        })
      );
    });

    // Test case when 'page' and 'limit' are extremely large numbers
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
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    // Test case for SQL injection attempt
    test("Should return 400 Bad Request when SQL injection is attempted in 'page'", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins?page=1;DROP TABLE admins;")
        .set("Accept", "application/json")
        .query({
          limit: 10,
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    // Test case when 'page' and 'limit' are null
    test("Should return 400 Bad Request when 'page' and 'limit' are null", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins?page=&limit=")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    // Test case when 'page' and 'limit' are boolean values
    test("Should return 400 Bad Request when 'page' and 'limit' are boolean values", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins?page=true&limit=false")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    // Test case when both 'page' and 'limit' are valid maximum values
    test("Should return 200 OK when 'page' and 'limit' are at their maximum allowed values", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: 1000, // Maximum page
          limit: 100, // Maximum limit
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("page", 1000);
      expect(response.body).toHaveProperty("limit", 100);
    });

    // Test case when 'page' and 'limit' are strings of numbers
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

    // Test case when 'page' and 'limit' are floating-point numbers but integers as strings
    test("Should return 400 Bad Request when 'page' and 'limit' are floating-point numbers", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins")
        .set("Accept", "application/json")
        .query({
          page: "1.0",
          limit: "10.0",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });
  });
});
