require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s5/products/{product_id}/photos", () => {
  describe("Test suite for post /s5/products/{product_id}/photos", () => {
    test("Test case: /s5/products/{product_id}/photos with Request Example: ValidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s5/products/{product_id}/photos")
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
    test("Test case: /s5/products/{product_id}/photos with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s5/products/{product_id}/photos")
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
  });
  describe("Test suite for get /s5/products/{product_id}/photos", () => {});
});
