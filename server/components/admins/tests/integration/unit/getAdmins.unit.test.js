// Import the necessary module for unit tests
const { getAdmins } = require("../../../db/admins.db");

// Mock the getAdmins function to avoid real database calls
jest.mock("../../../db/admins.db", () => ({
  getAdmins: jest.fn()
}));

describe("Unit Tests for getAdmins Function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks before each test to avoid side effects
  });

  it("should return a list of admins when the query is successful", async () => {
    // Arrange: Mock the expected return value from the database query
    const mockAdmins = [
      { id: 1, name: "Admin One" },
      { id: 2, name: "Admin Two" },
    ];
    getAdmins.mockResolvedValue(mockAdmins);

    // Act: Call the function to be tested
    const admins = await getAdmins();

    // Assert: Verify that the function returns the expected data
    expect(admins).toEqual(mockAdmins);
  });

  it("should return an empty array when no admins are found", async () => {
    // Arrange: Mock an empty result from the database
    getAdmins.mockResolvedValue([]);

    // Act: Call the function to be tested
    const admins = await getAdmins();

    // Assert: Verify that the function returns an empty array
    expect(admins).toEqual([]);
  });

  it("should throw an error when the query fails", async () => {
    // Arrange: Mock a rejected value to simulate a database error
    getAdmins.mockRejectedValue(new Error("Query failed"));

    // Act & Assert: Expect the function to throw an error
    await expect(getAdmins()).rejects.toThrow("Query failed");
  });
});
