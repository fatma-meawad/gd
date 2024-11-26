require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s1/admins/register", () => {

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
      //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
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
      //TODO: assert the exact error messages to assert why the request failed.
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
      //TODO: assert the exact error messages to assert why the request failed.
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
      //TODO: assert the exact error messages to assert why the request failed.
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
      //TODO: assert the exact error messages to assert why the request failed.
    });

    //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.

    test("Test case /s1/admins/register for Expected Response - Status 201 Example: ", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
        .set("Accept", "application/json")
        .set("Prefer", "code=201, dynamic=true")
        .set("Content-Type", "application/json")
        .send({});

      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("messages");
      //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
    });

    test("Test case /s1/admins/register for Expected Response - Status 400 Example: ", async () => {
      const response = await request(app)
        .post(baseUrl + "/s1/admins/register")
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
  });
});
