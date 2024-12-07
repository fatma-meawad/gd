const { getAdminsPasswordResetDb } = require("../../db/admins.db");

const mockPool = {
  query: jest.fn(),
};

jest.mock("../../../config/dbconfig", () => ({
  pool: mockPool,
}));

describe("getAdminsPasswordResetDb", () => {
  beforeEach(() => {
    jest.resetModules();
    mockPool.query.mockReset();
  });

  it("should return success when a valid token is provided", async () => {
    const validToken = "valid-reset-token";

    // Mock database response
    mockPool.query.mockResolvedValue({
      rows: [{ admin_id: 12345 }],
    });

    const result = await getAdminsPasswordResetDb(validToken);

    expect(result).toEqual({
      messages: ["Token is valid. Proceed with password reset."],
      data: { userId: 12345 },
    });

    expect(mockPool.query).toHaveBeenCalledWith(
      `
      SELECT
          used_by AS admin_id
      FROM
          ActivationCode
      WHERE
          code = $1
          AND type = 'reset'
          AND is_used = FALSE
          AND expiry_date > NOW();
      `,
      [validToken]
    );
  });

  it("should return an error when an invalid token is provided", async () => {
    const invalidToken = "invalid-reset-token";

    // Mock empty database response
    mockPool.query.mockResolvedValue({ rows: [] });

    const result = await getAdminsPasswordResetDb(invalidToken);

    expect(result).toEqual({
      status: "error",
      errors: ["The provided token is invalid or expired."],
    });

    expect(mockPool.query).toHaveBeenCalledWith(
      `
      SELECT
          used_by AS admin_id
      FROM
          ActivationCode
      WHERE
          code = $1
          AND type = 'reset'
          AND is_used = FALSE
          AND expiry_date > NOW();
      `,
      [invalidToken]
    );
  });
});