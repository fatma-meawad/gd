require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

describe("Test suite for /s3/messages", () => {
  describe("Test suite for post /s3/messages", () => {
    test("Test case: /s3/messages with Request Example: validMessage", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/messages")
        .set("Accept", "application/json")
        .set("auth", "Bearer eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obi5kb")
        .query({})
        .send({
          sender_id: 1,
          recipient_id: 2,
          thread: "thread name",
          content: "Hello!",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("messages");
    });

    test("Test case /s3/messages for Expected Response - Status 400 Example: empty input", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/messages")
        .set("Accept", "application/json")
        .set("Prefer", "code=200, dynamic=true")
        .set("Content-Type", "application/json")
        .set("auth", "Bearer eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obi5kb")
        .send({});

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("path");
    });

    test("Test case: /s3/messages with missing required fields", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/messages")
        .set("Accept", "application/json")
        .set("auth", "Bearer eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obi5kb")
        .send({
          sender_id: 1,
          // recipient_id missing
          thread: "thread name",
          content: "Hello!",
          time: "2024-11-08T19:18:53Z",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("path");
    });
    test("Test case: /s3/messages with invalid sender_id format", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/messages")
        .set("Accept", "application/json")
        .set("auth", "Bearer eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obi5kb")
        .send({
          sender_id: "1",
          recipient_id: 2,
          thread: "thread name",
          content: "Hello!",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("path");
    });
    test("Test case: /s3/messages with Request Example: InvalidExample - Error 401", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/messages")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("auth", "123") // invalid auth token 
        .send({
          sender_id: 1,
          recipient_id: 2,
          thread: "thread name",
          content: "Hello!",
        });

      expect(response.status).toBe(401);
      expect(response.body).toMatchObject({
        message: '"auth" header is invalid',
        status: "401",
        errors: ["401 unauthorized"],
        locations: ["messages.controller.js"],
      });
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body).toHaveProperty("locations");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("status");
    });
  });
});
