require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s3/adminlogs", () => {
  describe("Test suite for get /s3/adminlogs", () => {
    test("Test case: /s3/adminlogs with Request Example: ValidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          admin_id: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s3/adminlogs with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          admin_id: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s3/adminlogs with Request Example: ValidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          keyword: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s3/adminlogs with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          keyword: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s3/adminlogs with Request Example: ValidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          date_range: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s3/adminlogs with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          date_range: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s3/adminlogs with Request Example: ValidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          sort_by: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s3/adminlogs with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          sort_by: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s3/adminlogs with Request Example: ValidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          order: "",
        })
        .send({})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      //TODO: assert the exact error messages to assert why the request failed.
    });
    test("Test case: /s3/adminlogs with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
        .set("Accept", "application/json")
        .query({
          order: "",
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

    test("Test case /s3/adminlogs for Expected Response - Status 200 Example: array_of_logs", async () => {
      const response = await request(app)
        .get(baseUrl + "/s3/adminlogs")
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
  });
  describe("Test suite for post /s3/adminlogs", () => {
    test("Test case: /s3/adminlogs with Request Example: ValidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/adminlogs")
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
    test("Test case: /s3/adminlogs with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/adminlogs")
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
  });
});
