require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s5/products", () => {
  describe("Test suite for get /s5/products", () => {
    test("Test case /s5/products for Expected Response - Status 200 Example: products", async () => {
      const response = await request(app)
        .get(baseUrl + "/s5/products")
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

    test("Test case /s5/products for Expected Response - Status 200 Example: empty", async () => {
      const response = await request(app)
        .get(baseUrl + "/s5/products")
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

////////////////////////////////////////////////////////////////////////////////////////////////
  describe("Test suite for post /s5/products", () => {
    test("Test case: /s5/products with Request Example: ValidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s5/products")
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
    test("Test case: /s5/products with Request Example: InvalidExample", async () => {
      const response = await request(app)
        .post(baseUrl + "/s5/products")
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
//New test cases for scenatios: correctProductData, wrongCatIdFormat, missingProductName.
    test("Test case: /s5/products with Request Example: correctProductData", async () => {
      const response = await request(app)
        .post(baseUrl + "/s5/products")
        .set("Accept", "application/json")
        .query({})
        .send({
          product_name: "RGB keyboard",
          category_id: 12345,
          category_name: "Keyboards",
          short_description: "Experience seamless typing with this wireless RGB keyboard, featuring customizable backlighting, ergonomic design, and reliable connectivity for a smooth and vibrant typing experience",
          detailed_description: "Upgrade your typing experience with this wireless RGB keyboard, combining style and functionality. With customizable RGB lighting, an ergonomic design, and quiet, responsive keys, it ensures a smooth typing experience whether you're working or gaming. Benefit from stable wireless connectivity, extended battery life, and a sleek, vibrant design that enhances any workspace",
          product_photos: [
            "https://example.com/photo1.jpg",
            "https://example.com/photo2.jpg"
          ],
          product_url: "https://youtu.be/0LE0trd740Q"
        })
        .set("Content-Type", "application/json");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object));
        // expect(response.body).toHaveProperty("data"); //Uncomment at phase 2*************It is being flagged at tests.
        expect(response.body).toHaveProperty("locations"); //Delete at phase 2**************
        expect(response.body).toHaveProperty("messages");
    });

    test("Test case: /s5/products with Request Example: wrongCatIdFormat", async () => {
      const response = await request(app)
        .post(baseUrl + "/s5/products")
        .set("Accept", "application/json")
        .query({})
        .send({
          product_name: "RGB keyboard",
          category_id: "12345n",
          category_name: "Keyboards",
          short_description: "Experience seamless typing with this wireless RGB keyboard, featuring customizable backlighting, ergonomic design, and reliable connectivity for a smooth and vibrant typing experience",
          detailed_description: "Upgrade your typing experience with this wireless RGB keyboard, combining style and functionality. With customizable RGB lighting, an ergonomic design, and quiet, responsive keys, it ensures a smooth typing experience whether you're working or gaming. Benefit from stable wireless connectivity, extended battery life, and a sleek, vibrant design that enhances any workspace",
          product_photos: [
            "https://example.com/photo1.jpg",
            "https://example.com/photo2.jpg"
          ],
          product_url: "https://youtu.be/0LE0trd740Q"
        })
        .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty("errors");
    });

    test("Test case: /s5/products with Request Example: missingProductName", async () => {
      const response = await request(app)
        .post(baseUrl + "/s5/products")
        .set("Accept", "application/json")
        .query({})
        .send({
          // product_name: "RGB keyboard",
          category_id: 12345,
          category_name: "Keyboards",
          short_description: "Experience seamless typing with this wireless RGB keyboard, featuring customizable backlighting, ergonomic design, and reliable connectivity for a smooth and vibrant typing experience",
          detailed_description: "Upgrade your typing experience with this wireless RGB keyboard, combining style and functionality. With customizable RGB lighting, an ergonomic design, and quiet, responsive keys, it ensures a smooth typing experience whether you're working or gaming. Benefit from stable wireless connectivity, extended battery life, and a sleek, vibrant design that enhances any workspace",
          product_photos: [
            "https://example.com/photo1.jpg",
            "https://example.com/photo2.jpg"
          ],
          product_url: "https://youtu.be/0LE0trd740Q"
        })
        .set("Content-Type", "application/json");

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty("errors");
    });

    //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.
  });
});
