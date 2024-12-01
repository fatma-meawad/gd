const { postMessagesDb } = require("../../db/messages.db");
const mockMessages = require("../../db/mock/messages.json");

describe("postMessagesDb", () => {
  jest.mock("../../db/mock/messages.json", () => mockMessages);

  // Test case 1: successfully save a valid message
  it("should successfully save a valid message and return it", async () => {
    const result = await postMessagesDb(mockMessages[0]);

    expect(result.data).toEqual({
      id: 1,
      sender_id: 5,
      recipient_id: 6,
      thread: "Test Thread",
      content: "This is a test message",
      time: "2024-11-08T19:18:53Z",
    });
  });

  // Test case 2: should have property 'sender_id'
  test("should have property 'sender_id'", async () => {
    const result = await postMessagesDb(
      mockMessages[0].id,
      mockMessages[0].recipient_id,
      mockMessages[0].thread,
      mockMessages[0].content,
      mockMessages[0].time
    );

    expect(result.data).toHaveProperty("sender_id");
  });

  // Test case 3: should have property 'recipient_id'
  test("should have property 'recipient_id'", async () => {
    const result = await postMessagesDb(
      mockMessages[0].sender_id,
      mockMessages[0].id,
      mockMessages[0].thread,
      mockMessages[0].content,
      mockMessages[0].time
    );

    expect(result.data).toHaveProperty("recipient_id");
  });

  // Test case 4: should have property 'content'
  test("should have property 'content'", async () => {
    const result = await postMessagesDb(
      mockMessages[0].sender_id,
      mockMessages[0].recipient_id,
      mockMessages[0].thread,
      mockMessages[0].id,
      mockMessages[0].time
    );

    expect(result.data).toHaveProperty("content");
  });

  // Test case 5: should have property 'time'
  test("should have property 'time'", async () => {
    const result = await postMessagesDb(
      mockMessages[0].sender_id,
      mockMessages[0].recipient_id,
      mockMessages[0].thread,
      mockMessages[0].content,
      mockMessages[0].id
    );

    expect(result.data).toHaveProperty("time");
  });
});
