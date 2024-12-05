require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s4/business/{business_id}/sellers/", () => {
  describe("Test suite for post /s4/business/{business_id}/sellers/", () => {
    test("Test case: /s4/business/{business_id}/sellers/ with Request Example: valid", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/business/{business_id}/sellers/")
        .set("Accept", "application/json")
        .query({})
        .send({
          name: "John Doe",
          profile_photo: "https://example.com/photo.jpg",
          address: "123 Main St, Springfield",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe();
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
    });
    test("Test case: /s4/business/{business_id}/sellers/ with Request Example: invalid", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/business/{business_id}/sellers/")
        .set("Accept", "application/json")
        .query({})
        .send({
          name: "",
          profile_photo: "not_a_url",
          address: "",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe();
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
    });

    //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.

    test("Test case /s4/business/{business_id}/sellers/ for Expected Response - Status 200 Example: success", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/business/{business_id}/sellers/")
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

    test("Test case /s4/business/{business_id}/sellers/ for Expected Response - Status 400 Example: invalid_data", async () => {
      const response = await request(app)
        .post(baseUrl + "/s4/business/{business_id}/sellers/")
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
