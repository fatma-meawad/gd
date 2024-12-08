require("dotenv-flow").config();
const request = require("supertest");
const ROOT_DIR = process.cwd();
const app = require(ROOT_DIR + "/app");
const baseUrl = process.env.BASE_API_TEST_URL;

describe("Test suite for /s1/admins/password-reset", () => {
  describe("Test suite for get /s1/admins/password-reset", () => {
    test("Valid token - Success response", async () => {
      const response = await request(app)
        .get(`${baseUrl}/s1/admins/password-reset`)
        .set("Accept", "application/json")
        .query({ token: "ValidTkn" });

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toMatchObject({
        status: "success",
        messages: expect.arrayContaining([
          "Token is valid. Proceed with password reset.",
        ]),
      });

      expect(response.body.data).toMatchObject({
        userId: expect.any(String),
      });
    });

    test("Test case: /s1/admins/password-reset with invalid token (empty token)", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .query({ token: "" })
        .send();

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: "Empty value found for query parameter 'token'",
            path: "/query/token",
          }),
        ])
      );
    });

    test("Test case: /s1/admins/password-reset with invalid token (wrong pattern)", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .query({ token: "Inv!#!" })
        .send();

      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            errorCode: "pattern.openapi.validation",
            message: 'must match pattern "^[A-Za-z0-9]{8}$"',
            path: "/query/token",
          }),
        ])
      );
    });

    test("Test case: /s1/admins/password-reset with expired token", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .query({ token: "ExpiredToken123" }) // Ensure this token is recognized as expired
        .send();

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain("Token has expired");
    });

    test("Test case: /s1/admins/password-reset with token too long", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .query({ token: "A".repeat(9) }) // Token exceeds max length (8)
        .send();

      expect(response.status).toBe(400);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: "must NOT have more than 8 characters",
          path: "/query/token",
        })
      );
    });

    test("Test case: /s1/admins/password-reset for unexpected error", async () => {
      const response = await request(app)
        .get(baseUrl + "/s1/admins/password-reset")
        .set("Accept", "application/json")
        .query({ token: "SomeToken" }) // Simulate an error scenario
        .send();

      expect(response.status).toBe(500);
      expect(response.body.errors).toContain("Unexpected server error.");
    });
  });
});
