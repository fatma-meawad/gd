require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

// Import the necessary modules for unit tests
const { getAdmins } = require("../../../../db/admins.db"); // Assuming admins.db.js is in db folder
const db = require("../../../../db/connection"); // Actual database connection file

// Mock the db module to prevent real database calls
jest.mock("../../../../db/connection");

describe("Test suite for /s1/admins", () => {

  // ===== UNIT TESTS FOR DATABASE FUNCTIONS =====
  describe("Unit Tests for getAdmins Function", () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear any previous mocks before each test to avoid side effects
    });

    it("should return a list of admins when the query is successful", async () => {
      // Arrange: Mock the expected return value from the database query
      const mockAdmins = [{ id: 1, name: 'Admin One' }, { id: 2, name: 'Admin Two' }];
      db.query.mockResolvedValue({ rows: mockAdmins });

      // Act: Call the function to be tested
      const admins = await getAdmins();

      // Assert: Verify that the function returns the expected data
      expect(admins).toEqual(mockAdmins);
    });

    it("should return an empty array when no admins are found", async () => {
      // Arrange: Mock an empty result from the database
      db.query.mockResolvedValue({ rows: [] });

      // Act: Call the function to be tested
      const admins = await getAdmins();

      // Assert: Verify that the function returns an empty array
      expect(admins).toEqual([]);
    });

    it("should throw an error when the database query fails", async () => {
      // Arrange: Mock a rejected value to simulate a database error
      db.query.mockRejectedValue(new Error("Query failed"));

      // Act & Assert: Call the function and expect it to throw the correct error
      await expect(getAdmins()).rejects.toThrow("Database Error: Query failed");
    });
  });

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

    // Test case when 'page' and 'limit' are numeric strings
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

    // More integration test cases if needed...
  });
});


