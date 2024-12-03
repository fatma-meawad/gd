// Import the necessary module for unit tests
const { getAdminsDb } = require("../../db/admins.db");

describe("Unit Tests for getAdminsDb Function", () => {
  it("should return a list of admins when the query is successful", async () => {
    const result = await getAdminsDb();
    expect(result).toHaveProperty("data");
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
  });

  it("should return an empty array when no admins are found", async () => {
    const result = await getAdminsDb();
    expect(result).toHaveProperty("data");
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBe(0);
  });

  it("should throw an error when invalid parameters are provided", async () => {
    const result = await getAdminsDb({ invalid: true });
    expect(result).toHaveProperty("errors");
    expect(Array.isArray(result.errors)).toBe(true);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
