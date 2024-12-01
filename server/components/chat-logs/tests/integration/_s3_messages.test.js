require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

//TODO: The test cases are generated from your examples, but double check that all is ok and all your cases are covered
//TODO: Check the requirements in the task to see what other checks are required

describe("Test suite for /s3/messages", () => {
  describe("Test suite for post /s3/messages", () => {
    test("Test case: /s3/messages with Request Example: validMessage", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/messages")
        .set("Accept", "application/json")
        .query({})
        .send({
          id: 1,
          sender_id: 1,
          recipient_id: 2,
          thread: "thread name",
          content: "Hello!",
          time: "2024-11-08T19:18:53Z",
        })
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("messages");
      //TODO: If you have attributes that must be returned inside data, make sure they are marked required in openapi schema
    });

    //TODO: The following cover your respones in openapi. If your examples cover a test case, you can delete it.

    test("Test case /s3/messages for Expected Response - Status 200 Example: successfulResponse", async () => {
      const response = await request(app)
        .post(baseUrl + "/s3/messages")
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
    expect(response.body.error).toBe("No messages found with the specified recipient.");
  });
});
