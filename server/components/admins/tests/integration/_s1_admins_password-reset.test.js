require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s1/admins/password-reset", () => {
  describe("Test suite for get /s1/admins/password-reset", () => {
    test("Test case: /s1/admins/password-reset with Request Example: ValidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .query({
          token: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s1/admins/password-reset with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .query({
          token: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });

    //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.

    test("Test case /s1/admins/password-reset for Expected Response - Status 200 Example: successExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .set("Prefer", "code=200, dynamic=true")
        .set("Content-Type", "application/json")
        .send({});

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("messages");
      //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
    });

    test("Test case /s1/admins/password-reset for Expected Response - Status 400 Example: ", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins/password-reset")
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
  describe("Test suite for put /s1/admins/password-reset", () => {
    test("Test case: /s1/admins/password-reset with Request Example: ValidExample", async () => {
      const response = await request(app)
        .put(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .query({})
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("messages");
      //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
    });
    test("Test case: /s1/admins/password-reset with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .put(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .query({})
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("messages");
      //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
    });

    //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.

    test("Test case /s1/admins/password-reset for Expected Response - Status 200 Example: successExample", async () => {
      const response = await request(app)
        .put(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .set("Prefer", "code=200, dynamic=true")
        .set("Content-Type", "application/json")
        .send({});

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("messages");
      //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
    });

    test("Test case /s1/admins/password-reset for Expected Response - Status 400 Example: invalidTokenExample", async () => {
      const response = await request(app)
        .put(baseUrl + "/s1/admins/password-reset")
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

    test("Test case /s1/admins/password-reset for Expected Response - Status 400 Example: complexityErrorExample", async () => {
      const response = await request(app)
        .put(baseUrl + "/s1/admins/password-reset")
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
