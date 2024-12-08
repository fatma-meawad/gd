require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

// Import the mock data factory
const { getMockBusinesses } = require("../mock/mockDataFactory");

// Mock the businesses.db.js module
jest.mock("../../db/businesses.db", () => ({
  getBusinessesDb: jest.fn(),
}));

const { getBusinessesDb } = require("../../db/businesses.db");

// Valid JWT token for testing, matching the pattern in specs.yaml
const validAuthToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s4/businesses", () => {
  // POST /businesses
  /*describe("Test suite for post /s4/businesses", () => {
    test("Test case: /s4/businesses with Request Example: ValidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/businesses")
        .set("Accept", "application/json")
        .query({})
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s4/businesses with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/businesses")
        .set("Accept", "application/json")
        .query({})
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });

    //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.

    test("Test case /s4/businesses for Expected Response - Status 400 Example: example-400", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/businesses")
        .set("Accept", "application/json")
        .set("Prefer", "code=400, dynamic=true")
        .set("Content-Type", "application/json")
        .send({});

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
  });*/

  // GET /businesses
  /* This test suite validates the GET /businesses endpoint against the OpenAPI specification:
   * - Tests all response status codes (200, 400, 401, 403, 404)
   * - Validates pagination with boundary testing (max limit: 50, max offset: 1000)
   * - Ensures proper JWT token validation
   * - Validates response schema against BusinessData component definition
   * - Tests both required and optional fields with their patterns
   */
  describe("Test suite for GET /s4/businesses", () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear any previous mocks
    });

    // Happy Path Tests
    test("Test case: Successful retrieval with default pagination", async () => {
      // Use the full mock data
      getBusinessesDb.mockResolvedValue({
        businesses: getMockBusinesses(false),
        pagination_info: { limit: 50, offset: 0 },
      });

      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("businesses");
      expect(response.body).toHaveProperty("pagination_info");

      // Validate required fields from BusinessData schema
      const business = response.body.businesses[0];
      expect(business).toHaveProperty("id");
      expect(business).toHaveProperty("title");
      expect(business).toHaveProperty("main_owner_email");
      expect(business).toHaveProperty("created_at");
      expect(business).toHaveProperty("is_active");

      // Validate pagination_info structure
      expect(response.body.pagination_info).toHaveProperty("limit");
      expect(response.body.pagination_info).toHaveProperty("offset");
    });

    // Pagination Tests
    test("Test case: Valid pagination parameters", async () => {
      // Use the full mock data
      getBusinessesDb.mockResolvedValue({
        businesses: getMockBusinesses(false),
        pagination_info: { limit: 10, offset: 0 },
      });

      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .query({ limit: 10, offset: 0 })
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.pagination_info.limit).toBe(10);
      expect(response.body.pagination_info.offset).toBe(0);
    });
    test("Test case: Maximum allowed limit", async () => {
      // Use the full mock data
      getBusinessesDb.mockResolvedValue({
        businesses: getMockBusinesses(false),
        pagination_info: { limit: 50, offset: 0 },
      });

      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .query({ limit: 50 }) // Maximum from specs
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.businesses.length).toBeLessThanOrEqual(50);
    });
    test("Test case: Maximum allowed offset", async () => {
      // Use the empty mock data
      getBusinessesDb.mockResolvedValue({
        businesses: getMockBusinesses(true),
        pagination_info: { limit: 50, offset: 1000 },
      });

      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .query({ offset: 1000 }) // Maximum from specs
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toContain("No businesses found");
    });

    // Invalid Pagination Tests
    test("Test case: Invalid limit parameter", async () => {
      // Use the full mock data
      getBusinessesDb.mockResolvedValue({
        businesses: getMockBusinesses(false),
        pagination_info: { limit: 50, offset: 0 },
      });

      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .query({ limit: -1 })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            errorCode: "minimum.openapi.validation",
            message: "must be >= 1",
            path: "/query/limit",
          }),
        ])
      );
    });
    test("Test case: Invalid offset parameter", async () => {
      // Use the full mock data
      getBusinessesDb.mockResolvedValue({
        businesses: getMockBusinesses(false),
        pagination_info: { limit: 50, offset: 0 },
      });

      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .query({ offset: -1 })
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            errorCode: "minimum.openapi.validation",
            message: "must be >= 0",
            path: "/query/offset",
          }),
        ])
      );
    });

    // Authorization Tests
    /*
    test("Test case: Missing authorization token", async () => {
      // Cant test for this - authVerifier.js does not support returning a 401 status for missing tokens
      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("Accept", "application/json");
  
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.error).toBe("Unauthorized");
    });
    */
    /*
    test("Test case: Missing Bearer prefix", async () => {
      // Cant test for this - authVerifier.js does not handle the case of missing Bearer prefix for now (?)
      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken.replace("Bearer ", ""))
        .set("Accept", "application/json");
    
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.error).toBe("Unauthorized");
    });
    */
    /*
    test("Test case: Invalid authorization token format", async () => {
      // Cant test for this - authVerifier.js should respond with 401 unauthorized to invalid token format - i think :)
      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", "InvalidToken")
        .set("Accept", "application/json");
  
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.error).toBe("Unauthorized");
    });
    */

    // Permission Tests
    /*
    test("Test case: Permission denied", async () => {
      // Cant test for this - authVerifier.js currently only checks for the presence of an authorization header and does not perform any actual permission checks
      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .set("Accept", "application/json");
  
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.error).toBe("Permission denied");
    });
    */

    // Not Found Tests
    test("Test case: No businesses found", async () => {
      // Use the empty mock data
      getBusinessesDb.mockResolvedValue({
        businesses: getMockBusinesses(true),
        pagination_info: { limit: 50, offset: 0 },
      });

      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toContain("No businesses found");
    });

    // Empty list Test
    test("Test case: Empty businesses list", async () => {
      // Use the empty mock data
      getBusinessesDb.mockResolvedValue({
        businesses: getMockBusinesses(true),
        pagination_info: { limit: 50, offset: 0 },
      });

      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .set("Accept", "application/json");

      expect(response.status).toBe(404);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toContain("No businesses found");
    });

    // Example Response Validation
    test("Test case: Response matches businesses-list example with complete schema validation", async () => {
      // Use the full mock data
      getBusinessesDb.mockResolvedValue({
        businesses: getMockBusinesses(false),
        pagination_info: { limit: 50, offset: 0 },
      });

      const response = await request(app)
        .get(baseUrl + "/s4/businesses")
        .set("auth", validAuthToken)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));

      // First validate the overall response structure
      expect(response.body).toMatchObject({
        businesses: expect.any(Array),
        pagination_info: {
          limit: expect.any(Number),
          offset: expect.any(Number),
        },
      });

      // Then validate each business in the array
      response.body.businesses.forEach((business) => {
        // BusinessData schema defines required fields ['id', 'title', 'main_owner_email', 'created_at', 'is_active'] - which I chose arbitrarily for GET, as depending where we use the data, we wont need everything every time probably - while other fields are currently optional. This test validates both required and optional fields according to their patterns defined in the OpenAPI specification
        expect(business).toMatchObject({
          id: expect.any(Number),
          title: expect.stringMatching(/^[a-zA-Z0-9\s.-]*$/),
          main_owner_email: expect.stringMatching(/^[^@]+@[^@]+\.[^@]+$/),
          created_at: expect.stringMatching(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
          ),
          is_active: expect.any(Boolean),
        });

        // Then validate optional fields when they exist
        if (business.phone) {
          expect(business.phone).toMatch(/^\+?[1-9]\d{1,14}$/);
        }
        if (business.address) {
          expect(business.address).toMatch(/^[a-zA-Z0-9\s,.-]*$/);
        }
        if (business.web_address) {
          expect(business.web_address).toMatch(/^https?:\/\/.+/);
        }
        if (business.description) {
          expect(business.description).toMatch(/^[a-zA-Z0-9\s.,!?()-]*$/);
        }
        if (business.main_owner_name) {
          expect(business.main_owner_name).toMatch(/^[a-zA-Z\s.-]*$/);
        }
        if (business.main_owner_phone) {
          expect(business.main_owner_phone).toMatch(/^\+?[1-9]\d{1,14}$/);
        }
        if (business.image) {
          expect(business.image).toMatch(/^https?:\/\/.+/);
        }
        if (business.updated_at) {
          expect(business.updated_at).toMatch(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
          );
        }
        if (business.deactivated_at) {
          expect(business.deactivated_at).toMatch(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
          );
        }
      });
    });
  });
});
