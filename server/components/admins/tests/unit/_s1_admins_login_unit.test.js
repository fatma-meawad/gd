const { postAdminsLoginDb } = require("../../db/admins.db");

const mockPool = {
  query: jest.fn(),
};

jest.mock("../../config/dbconfig.js", () => ({
  pool: mockPool,
}));

describe("AdminsDatabase", () => {
  beforeEach(() => {
    mockPool.query.mockReset();
  });

  const mockPool = {
    query: jest.fn(),
  };

  jest.mock("../../config/dbconfig.js", () => ({
    pool: mockPool,
  }));

  describe("AdminsDatabase", () => {
    beforeEach(() => {
      mockPool.query.mockReset();
    });

    describe("postAdminsLoginDb", () => {
      test("should successfully log in with valid credentials", async () => {
        const mockCredentials = {
          email: "admin@example.com",
          password: "SecureP@ss123",
        };

        mockPool.query.mockResolvedValue({
          rows: [
            {
              admin_id: 1,
              email: mockCredentials.email,
              full_name: "Admin User",
              hashed_password: "$2b$10$hashedPasswordHere", // Simulating hashed password
            },
          ],
        });

        const result = await postAdminsLoginDb(mockCredentials);

        expect(result.data).toHaveProperty("admin_id");
        expect(result.data).toHaveProperty("email");
        expect(result.messages).toContain("Login successful");
      });

      test("should fail with invalid credentials", async () => {
        const mockCredentials = {
          email: "admin@example.com",
          password: "WrongPassword",
        };

        mockPool.query.mockResolvedValue({
          rows: [
            {
              admin_id: 1,
              email: mockCredentials.email,
              full_name: "Admin User",
              hashed_password: "$2b$10$hashedPasswordHere", // Simulating hashed password
            },
          ],
        });

        await expect(postAdminsLoginDb(mockCredentials)).rejects.toThrow(
          "Invalid credentials. Please try again."
        );
      });

      test("should block account after 3 failed attempts", async () => {
        const mockCredentials = {
          email: "blocked.admin@example.com",
          password: "WrongPassword",
        };

        mockPool.query
          .mockResolvedValueOnce({ rows: [{ login_attempts: 3 }] }) // Failed attempts
          .mockResolvedValueOnce({ rows: [] }); // Account blocking query

        await expect(postAdminsLoginDb(mockCredentials)).rejects.toThrow(
          "Your account has been blocked due to multiple failed login attempts. Please reset your password."
        );
      });

      test("should reset failed attempts after successful login", async () => {
        const mockCredentials = {
          email: "admin@example.com",
          password: "SecureP@ss123",
        };

        mockPool.query
          .mockResolvedValueOnce({ rows: [{ login_attempts: 1 }] }) // Existing attempts
          .mockResolvedValueOnce({ rows: [{ admin_id: 1 }] }) // Successful login
          .mockResolvedValueOnce({ rows: [] }); // Reset login attempts

        const result = await postAdminsLoginDb(mockCredentials);

        expect(mockPool.query.mock.calls[2][0]).toContain("UPDATE Admins");
        expect(result.messages).toContain("Login successful");
      });

      test("should rollback transaction on error", async () => {
        const mockCredentials = {
          email: "admin@example.com",
          password: "SecureP@ss123",
        };

        mockPool.query
          .mockResolvedValueOnce({ rows: [] }) // BEGIN
          .mockRejectedValueOnce(new Error("Database error"))
          .mockResolvedValueOnce({ rows: [] }); // ROLLBACK

        await expect(postAdminsLoginDb(mockCredentials)).rejects.toThrow();

        expect(mockPool.query.mock.calls[2][0]).toContain("ROLLBACK");
      });

      test("should handle database connection error", async () => {
        const mockCredentials = {
          email: "admin@example.com",
          password: "SecureP@ss123",
        };

        mockPool.query.mockRejectedValue(
          new Error("Database connection error")
        );

        await expect(postAdminsLoginDb(mockCredentials)).rejects.toThrow(
          "Database connection error"
        );
      });

      test("should handle empty result set", async () => {
        const mockCredentials = {
          email: "nonexistent@example.com",
          password: "SecureP@ss123",
        };

        mockPool.query.mockResolvedValue({ rows: [] });

        await expect(postAdminsLoginDb(mockCredentials)).rejects.toThrow(
          "Invalid credentials. Please try again."
        );
      });

      test("should handle missing email or password", async () => {
        const mockCredentials = {
          email: "",
          password: "",
        };

        await expect(postAdminsLoginDb(mockCredentials)).rejects.toThrow(
          "Email and password are required."
        );
      });
    });
  });
});
