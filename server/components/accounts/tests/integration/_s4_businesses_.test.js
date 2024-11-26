require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s4/businesses/", () => {
  describe("Test suite for post /s4/businesses/", () => {
    test("Test case: /s4/businesses/ with Request Example: ValidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/businesses/")
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
    test("Test case: /s4/businesses/ with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/businesses/")
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

    test("Test case /s4/businesses/ for Expected Response - Status 400 Example: example-400", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/businesses/")
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
  describe("Test suite for get /s4/businesses/", () => {
    test("Test case: /s4/businesses/ with Request Example: ValidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s4/businesses/")
        .set("Accept", "application/json")
        .query({
          limit: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s4/businesses/ with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s4/businesses/")
        .set("Accept", "application/json")
        .query({
          limit: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s4/businesses/ with Request Example: ValidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s4/businesses/")
        .set("Accept", "application/json")
        .query({
          offset: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s4/businesses/ with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s4/businesses/")
        .set("Accept", "application/json")
        .query({
          offset: "",
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

    test("Test case /s4/businesses/ for Expected Response - Status 200 Example: businesses-list", async () => {
      const response = await request(app)
        .get(baseUrl + "/s4/businesses/")
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

    test("Test case /s4/businesses/ for Expected Response - Status 400 Example: example-400", async () => {
      const response = await request(app)
        .get(baseUrl + "/s4/businesses/")
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

    test("Test case /s4/businesses/ for Expected Response - Status 401 Example: example-401", async () => {
      const response = await request(app)
        .get(baseUrl + "/s4/businesses/")
        .set("Accept", "application/json")
        .set("Prefer", "code=401, dynamic=true")
        .set("Content-Type", "application/json")
        .send({});

      expect(response.status).toBe(401);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });

    test("Test case /s4/businesses/ for Expected Response - Status 403 Example: example-403", async () => {
      const response = await request(app)
        .get(baseUrl + "/s4/businesses/")
        .set("Accept", "application/json")
        .set("Prefer", "code=403, dynamic=true")
        .set("Content-Type", "application/json")
        .send({});

      expect(response.status).toBe(403);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });

    test("Test case /s4/businesses/ for Expected Response - Status 404 Example: example-404", async () => {
      const response = await request(app)
        .get(baseUrl + "/s4/businesses/")
        .set("Accept", "application/json")
        .set("Prefer", "code=404, dynamic=true")
        .set("Content-Type", "application/json")
        .send({});

      expect(response.status).toBe(404);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
  });
});
