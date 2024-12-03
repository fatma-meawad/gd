// getAdminlogsDb.test.js
const { getAdminlogsDb } = require("../../db/adminlogs.db");

describe("Unit Tests for getAdminlogsDb Function", () => {
  // Mock database connection and query
  const mockPool = {
    query: jest.fn(),
  };

  jest.mock("../../config/dbconfig.js", () => ({
    pool: mockPool,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should return all logs when no filters are provided", async () => {
    // Mocked database response
    mockPool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          action_type: "edit",
          admin_id: 101,
          message_id: 201,
          action_time: "2023-11-10T10:30:00Z",
          details: "Edited message content.",
        },
        {
          id: 2,
          action_type: "create",
          admin_id: 102,
          message_id: 202,
          action_time: "2023-11-10T11:00:00Z",
          details: "Created new message.",
        },
      ],
    });

    const logs = await getAdminlogsDb({});
    expect(logs.data).toHaveLength(2);
    expect(mockPool.query).toHaveBeenCalledTimes(1);
  });

  test("Should return logs filtered by admin_id", async () => {
    const options = { admin_id: 101 };
    mockPool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          action_type: "edit",
          admin_id: 101,
          message_id: 201,
          action_time: "2023-11-10T10:30:00Z",
          details: "Edited message content.",
        },
      ],
    });

    const logs = await getAdminlogsDb(options);
    expect(logs.data).toHaveLength(1);
    expect(logs.data[0].admin_id).toBe(101);
    expect(mockPool.query).toHaveBeenCalledWith(
      expect.stringContaining("WHERE admin_id = $1"),
      [101]
    );
  });

  test("Should return logs filtered by keyword", async () => {
    const options = { keyword: "Edited" };
    mockPool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          action_type: "edit",
          admin_id: 101,
          message_id: 201,
          action_time: "2023-11-10T10:30:00Z",
          details: "Edited message content.",
        },
      ],
    });

    const logs = await getAdminlogsDb(options);
    expect(logs.data).toHaveLength(1);
    expect(logs.data[0].details).toContain("Edited");
    expect(mockPool.query).toHaveBeenCalledWith(
      expect.stringContaining("WHERE details ILIKE $1"),
      ["%Edited%"]
    );
  });

  test("Should return logs within a date range", async () => {
    const options = { date_range: "2023-11-10:2023-11-10" };
    mockPool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          action_type: "edit",
          admin_id: 101,
          message_id: 201,
          action_time: "2023-11-10T10:30:00Z",
          details: "Edited message content.",
        },
        {
          id: 2,
          action_type: "create",
          admin_id: 102,
          message_id: 202,
          action_time: "2023-11-10T11:00:00Z",
          details: "Created new message.",
        },
      ],
    });

    const logs = await getAdminlogsDb(options);
    expect(logs.data).toHaveLength(2);
    expect(mockPool.query).toHaveBeenCalledWith(
      expect.stringContaining("WHERE action_time BETWEEN $1 AND $2"),
      ["2023-11-10", "2023-11-10"]
    );
  });

  test("Should return logs sorted by date in ascending order", async () => {
    const options = { sort_by: "date", order: "asc" };
    mockPool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          action_type: "edit",
          admin_id: 101,
          message_id: 201,
          action_time: "2023-11-10T10:30:00Z",
          details: "Edited message content.",
        },
        {
          id: 2,
          action_type: "create",
          admin_id: 102,
          message_id: 202,
          action_time: "2023-11-11T11:00:00Z",
          details: "Created new message.",
        },
      ],
    });

    const logs = await getAdminlogsDb(options);
    expect(logs.data[0].action_time).toBe("2023-11-10T10:30:00Z");
    expect(logs.data[1].action_time).toBe("2023-11-11T11:00:00Z");
    expect(mockPool.query).toHaveBeenCalledWith(
      expect.stringContaining("ORDER BY action_time asc"),
      []
    );
  });

  test("Should return an empty array when no logs are found", async () => {
    const options = { admin_id: 9999 };
    mockPool.query.mockResolvedValue({ rows: [] });

    const logs = await getAdminlogsDb(options);
    expect(logs.data).toHaveLength(0);
    expect(mockPool.query).toHaveBeenCalledTimes(1);
  });

  test("Should handle database errors gracefully", async () => {
    mockPool.query.mockRejectedValue(new Error("Database error"));

    await expect(getAdminlogsDb({})).rejects.toThrow("Database error");
    expect(mockPool.query).toHaveBeenCalledTimes(1);
  });
});
