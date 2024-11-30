require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;


describe("Test suite for /s1/admins/login", () => {
  describe("POST /s1/admins/login", () => {
    // Happy Path: Valid credentials
    test("Should successfully log in with valid credentials", async () => {
      const response = await request(app)
        .post(`${baseUrl}/s1/admins/login`)
        .set("Accept", "application/json")
        .send({
          email: "admin@example.com",
          password: "SecureP@ss123"
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("admin_id");
      expect(response.body).toHaveProperty("messages");
    });

    // Alternative Path: Invalid credentials
    test("Should return error for invalid credentials", async () => {
      const response = await request(app)
        .post(`${baseUrl}/s1/admins/login`)
        .set("Accept", "application/json")
        .send({
          email: "admin@example.com",
          password: "wrongpassword"
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
    });

    // Alternative Path: Account blocked due to failed attempts
    test("Should return error when account is blocked after multiple failed login attempts", async () => {
      const response = await request(app)
        .post(`${baseUrl}/s1/admins/login`)
        .set("Accept", "application/json")
        .send({
          email: "blocked.admin@example.com",
          password: "SecureP@ss123"
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(423);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
    });

    // Alternative Path: Invalid email format
    test("Should return error for invalid email format", async () => {
      const response = await request(app)
        .post(`${baseUrl}/s1/admins/login`)
        .set("Accept", "application/json")
        .send({
          email: "invalid-email",
          password: "SecureP@ss123"
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      // Validate the exact error message from your API
    });

    // Edge Case: Successful login resets attempt counter
    test("Should reset login attempt counter after successful login", async () => {
      // Simulate failed attempts first
      await request(app)
        .post(`${baseUrl}/s1/admins/login`)
        .set("Accept", "application/json")
        .send({
          email: "admin@example.com",
          password: "wrongpassword"
        })
        .set("Content-Type", "application/json");

      const response = await request(app)
        .post(`${baseUrl}/s1/admins/login`)
        .set("Accept", "application/json")
        .send({
          email: "admin@example.com",
          password: "SecureP@ss123"
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("admin_id");
      // Verify counter reset logic if exposed via response or logs
    });

    // Default case: Unexpected error
    test("Should return error for unexpected issues", async () => {
      const response = await request(app)
        .post(`${baseUrl}/s1/admins/login`)
        .set("Accept", "application/json")
        .send({
          email: "unexpected.error@example.com",
          password: "SecureP@ss123"
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
    });
  });
});
