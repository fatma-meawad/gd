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
          content: "Hello!",})
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
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
    test("Test case: /s3/messages with Request Example: No auth header - Error 401", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/messages")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
          sender_id: 1,
          recipient_id: 2,
          thread: "thread name",
          content: "Hello!",
        });

      expect(response.status).toBe(401);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("errors");
      expect(response.body).toHaveProperty("locations");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("status");
    });
  });
});

describe("Test suite for get /s3/messages/:receiver_id", () => {
  test("Test case: /s3/messages/:receiver_id with valid receiver_id", async () => {
    const receiverId = 2;

    const response = await request(app)
      .get(`${baseUrl}/s3/messages/${receiverId}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("messages");
  });

  test("Test case: /s3/messages/:receiver_id with invalid receiver_id", async () => {
    const receiverId = "invalid_id";

    const response = await request(app)
      .get(`${baseUrl}/s3/messages/${receiverId}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("messages");

    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(
      "No messages found with the specified recipient."
    );
  });

  test("Test case: /s3/messages/:receiver_id with no messages for that receiver_id", async () => {
    const receiverId = 9999; // assuming this ID has no messages

    const response = await request(app)
      .get(`${baseUrl}/s3/messages/${receiverId}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual([]);
    expect(response.body).toHaveProperty("messages");
  });

  test("Test case: /s3/messages/:receiver_id with invalid receiver_id", async () => {
    const receiverId = "invalid_id"; // Invalid ID type

    const response = await request(app)
      .get(`${baseUrl}/s3/messages/${receiverId}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(400); // Invalid ID should return 400
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("messages");
    expect(response.body.messages).toBe("Invalid receiver ID format");
  });

  test("Test case: /s3/messages/:receiver_id with no receiver_id", async () => {
    const response = await request(app)
      .get(`${baseUrl}/s3/messages/`) // Missing receiver_id
      .set("Accept", "application/json");

    expect(response.status).toBe(400); // No receiver_id should return 400
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("messages");
    expect(response.body.messages).toBe("Receiver ID is required");
  });
});
