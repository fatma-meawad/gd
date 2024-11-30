const { postMessagesDb } = require("../../db/messages.db");
const mockMessages = require("../../db/mock/messages.json");

describe("postMessagesDb", () => {
  jest.mock("../../db/mock/messages.json", () => mockMessages);

  const validMessage = {
    sender_id: 5,
    recipient_id: 6,
    thread: "Test Thread",
    content: "This is a test message",
  };

  const invalidMessage = {
    sender_id: "invalid",
    content: "",
  };

  beforeEach(() => {
    jest.resetModules();
    mockMessages.length = 0;
  });

  // Test Case 1: Successful insertion
  it("should successfully save a valid message and return it", async () => {
    const result = await postMessagesDb(validMessage);

    expect(result).toEqual({
      data: {
        id: validMessage.id,
        sender_id: validMessage.sender_id,
        recipient_id: validMessage.recipient_id,
        thread: validMessage.thread,
        content: validMessage.content,
        time: validMessage.time,
      },
    });
    expect(mockMessages).toContainEqual(validMessage);
  });

  // Test Case 2: Invalid input - missing required field
  it("should throw an error for missing required fields", async () => {
    await expect(postMessagesDb({})).rejects.toThrow(
      "Missing required fields: sender_id, recipient_id, content"
    );
  });

  // Test Case 3: Invalid input - incorrect data types
  it("should throw an error for invalid data types", async () => {
    await expect(postMessagesDb(invalidMessage)).rejects.toThrow(
      "Invalid data types for fields"
    );
  });

  // Test Case 4: Duplicate ID
  it("should throw an error if a message with the same ID already exists", async () => {
    mockMessages.push(validMessage);
    await expect(postMessagesDb(validMessage)).rejects.toThrow(
      "Message with the same ID already exists"
    );
  });
});
