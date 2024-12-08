const {
  getMessagesHistoryByAdminIdDb,
} = require("/workspaces/galleria-dashboard/server/components/chat-logs/db/messages.db");

const pool = new Pool({
  user: "chatlogs_user",
  host: "localhost",
  database: "chatlogs",
  password: "chatlogs_password",
  port: 9000,
});

describe("Unit tests for getMessagesHistoryByAdminIdDb function", () => {
  afterAll(async () => {
    await pool.end();
  });

  test("should return messages for a valid admin_id", async () => {
    const admin_id = 1; //admin id simulatw

    // Call the actual database function
    const result = await getMessagesHistoryByAdminIdDb(admin_id);

    //check result  for valid structure
    expect(result).toHaveProperty("messages");
    expect(Array.isArray(result.messages)).toBe(true);
    expect(result.messages.length).toBeGreaterThan(0); // checvk there are messages

    // check if each message contains the expected properties
    result.messages.forEach((message) => {
      expect(message).toHaveProperty("message_id");
      expect(message).toHaveProperty("sender_id");
      expect(message).toHaveProperty("recipient_id");
      expect(message).toHaveProperty("thread");
      expect(message).toHaveProperty("content");
      expect(message).toHaveProperty("time");
      expect(message).toHaveProperty("is_important");
    });
  });

  test("should return an empty list when no messages found for admin_id", async () => {
    const admin_id = 999; //simulating a non-existent admin ID (no messages)

    const result = await getMessagesHistoryByAdminIdDb(admin_id);

    expect(result).toHaveProperty("messages");
    expect(result.messages).toEqual(["No messages found for this admin"]);
  });
});
