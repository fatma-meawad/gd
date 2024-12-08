require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;
const db = require("../../config/dbconfig");

// Add test data setup
beforeAll(async () => {
  try {
    // Clean up any existing test data in correct order
    await db.query("DELETE FROM ActivationCode");
    await db.query("DELETE FROM AdminAccount");
  } catch (error) {
    console.error('Test setup error:', error);
    throw error;
  }
});

// Cleanup after tests
afterAll(async () => {
  try {
    await db.query("DELETE FROM ActivationCode");
    await db.query("DELETE FROM AdminAccount");
    await db.end();
  } catch (error) {
    console.error('Test cleanup error:', error);
    throw error;
  }
});

describe("Test suite for /s1/admins/register", () => {
  beforeEach(async () => {
    try {
      // Clean existing data
      await db.query("DELETE FROM ActivationCode");
      await db.query("DELETE FROM AdminAccount");

      // Insert test activation codes for this test
      await db.query(`
        INSERT INTO ActivationCode (code, type, is_used, expiry_date)
        VALUES
          ('ABCD1234', 'activation', false, CURRENT_TIMESTAMP + INTERVAL '1 day'),
          ('WXYZ5678', 'activation', false, CURRENT_TIMESTAMP + INTERVAL '1 day')
      `);
    } catch (error) {
      console.error('Test reset error:', error);
      throw error;
    }
  });

  // Helper function to create a test admin
  const createTestAdmin = async (email = "existing@example.com") => {
    try {
      await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .send({
          full_name: "Test User",
          email: email,
          phone: "+1234567890",
          password: "SecureP@ss123",
          activation_code: "WXYZ5678"
        });
    } catch (error) {
      console.error('Error creating test admin:', error);
    }
  };

  describe("Test suite for post /s1/admins/register", () => {
    test("Test case: /s1/admins/register with Request Example: validRegistration", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1234567890",
          password: "SecureP@ss123",
          activation_code: "ABCD1234",
          address: "123 Admin Street, City",
          profile_photo: "https://example.com/photos/john.jpg",
          bio: "Senior gallery administrator with 5 years experience",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("messages");
      // Adding checks for required attributes in data
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("email");
      expect(response.body.data).toHaveProperty("full_name");
      expect(response.body.messages).toEqual(expect.any(Array));
      expect(response.body.locations).toEqual(expect.any(Array));
    });

    test("Test case: /s1/admins/register with Request Example: invalidEmail", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "John Smith",
          email: "invalid-email",
          phone: "+1234567890",
          password: "SecureP@ss123",
          activation_code: "ABCD1234",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      // Adding exact error message check
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "format.openapi.validation",
        message: 'must match format "email"',
        path: "/body/email",
      });
    });

    test("Test case: /s1/admins/register with Request Example: invalidPassword", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1234567890",
          password: "weak",
          activation_code: "ABCD1234",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      // Adding exact error message check
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "minLength.openapi.validation",
        message: "must NOT have fewer than 8 characters",
        path: "/body/password",
      });
    });

    test("Test case: /s1/admins/register with Request Example: invalidActivationCode", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1234567890",
          password: "SecureP@ss123",
          activation_code: "123",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      // Adding exact error message check
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "pattern.openapi.validation",
        message: 'must match pattern "^[A-Z0-9]{8}$"',
        path: "/body/activation_code",
      });
    });

    test("Test case: /s1/admins/register with Request Example: missingRequired", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "John Smith",
          email: "john.smith@example.com",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      // Adding exact error message check
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "required.openapi.validation",
        message: "must have required property 'phone'",
        path: "/body/phone",
      });
    });

    test("Test case: /s1/admins/register with fields exceeding max length", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "J".repeat(101),
          email: "john.smith@example.com",
          phone: "+1234567890",
          password: "SecureP@ss123",
          activation_code: "ABCD1234",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "maxLength.openapi.validation",
        message: "must NOT have more than 100 characters",
        path: "/body/full_name",
      });
    });

    test("Test case: /s1/admins/register with invalid field patterns", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "John123",
          email: "john.smith@example.com",
          phone: "123456",
          password: "SecureP@ss123",
          activation_code: "ABCD1234",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "pattern.openapi.validation",
        message: 'must match pattern "^[a-zA-Z\\s.-]*$"',
        path: "/body/full_name",
      });
    });

    test("Test case: /s1/admins/register with invalid profile photo URL", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1234567890",
          password: "SecureP@ss123",
          activation_code: "ABCD1234",
          profile_photo: "not-a-valid-url",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toMatchObject({
        errorCode: "format.openapi.validation",
        message: 'must match format "uri"',
        path: "/body/profile_photo",
      });
    });

    // Business Logic Tests (These should fail in Phase 1)
    test("Test case: /s1/admins/register with duplicate email", async () => {
      // First create an admin
      await createTestAdmin();

      // Then try to create another admin with the same email
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .send({
          full_name: "Different Name",
          email: "existing@example.com",
          phone: "+1234567891",
          password: "SecureP@ss123",
          activation_code: "ABCD1234"
        });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toContain("Email already registered");
    });

    test("Test case: /s1/admins/register with expired activation code", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "John Smith",
          email: "john@example.com",
          phone: "+1234567890",
          password: "SecureP@ss123",
          activation_code: "EXPIRED1",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors).toContain(
        "Invalid or expired registration code"
      );
    });

    test("Test case: /s1/admins/register verify default values", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .query({})
        .send({
          full_name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1234567890",
          password: "SecureP@ss123",
          activation_code: "ABCD1234",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      
      // Check only the fields that should be returned
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("full_name");
      expect(response.body.data).toHaveProperty("email");
      
      // Optional: verify specific values
      expect(response.body.data.full_name).toBe("John Smith");
      expect(response.body.data.email).toBe("john.smith@example.com");
      
      // Make sure other fields are not present
      expect(response.body.data).not.toHaveProperty("status");
      expect(response.body.data).not.toHaveProperty("login_attempts");
      expect(response.body.data).not.toHaveProperty("phone");
    });
    
    test("Test case: /s1/admins/register verify schema", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .send({
          full_name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1234567890",
          password: "SecureP@ss123",
          activation_code: "ABCD1234",
        });
    
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data");
      
      // Schema validation
      expect(response.body.data).toMatchObject({
        id: expect.any(Number),
        email: expect.any(String),
        full_name: expect.any(String)
      });
    
      // Ensure no extra fields
      expect(Object.keys(response.body.data)).toHaveLength(3);
      expect(Object.keys(response.body.data).sort()).toEqual(['id', 'email', 'full_name'].sort());
    });    
  });
});