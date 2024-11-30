require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s2/categories", () => {
  describe("Test suite for post /s2/categories", () => {
    test("Test case: /s2/categories with Request Example: ValidExample", async () => {
      console.log("111: ", baseUrl + "/s2/categories")
      const response = await request(app)
        .post(baseUrl + "/s2/categories")
        .set("Accept", "application/json")
        .query({})
        .send({
          "title": "Food",
          "photo_url": "https://url.com/photo.jpg",
          "description": "This is something you can eat."
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("messages");
      expect(response.body).toHaveProperty("locations");
      //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
    });
    test("Test case: /s2/categories with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s2/categories")
        .set("Accept", "application/json")
        .query({})
        .send({
          "title": 123,
          "photo_url": 123,
          "description": 123
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("path");
      expect(response.body).toHaveProperty("status");
      //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
    });

    //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.
  });
});
