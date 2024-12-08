const { postMessagesDb } = require("../../db/messages.db");
const { pool } = require("../../config/dbconfig");

describe("postMessagesDb", () => {

  const validMessage = {
    sender_id: 5,
    recipient_id: 6,
    thread: "Test Thread",
    content: "This is a test message",
  };

  // Test Case 1: Successful insertion
  it("should successfully save a valid message and return it", async () => {
    const result = await postMessagesDb(5, 6, "Test Thread", "This is a test message");  
    expect(result).toMatchObject(validMessage);
  });

  // Test Case 2: Invalid input - missing required fields
  it("should throw an error for missing required fields", async () => {
    await expect(postMessagesDb({})).rejects.toThrow("Missing required fields");
  });

  // Test Case 3: Invalid input - incorrect data types
  it("should throw an error for invalid data types", async () => {
    await expect(postMessagesDb(5, "6", "Test Thread", "This is a test message")).rejects.toThrow("Invalid data type");
  });
});
