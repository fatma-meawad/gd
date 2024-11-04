const messages = require("../db/messages.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.postMessagesSend = async () => {
  // Implement your business logic here...

  try {
    let result = await messages.postMessagesSendDb();
    //delete this when you actually implement something.
    result.messages.push("postMessagesSend services not implemented yet");
    result.locations.push("messages.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getMessagesByThreadId = async (thread_id) => {
  // Implement your business logic here...

  try {
    let result = await messages.getMessagesByThreadIdDb(thread_id);
    //delete this when you actually implement something.
    result.messages.push("getMessagesByThreadId services not implemented yet");
    result.locations.push("messages.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.deleteMessagesByThreadId = async (id) => {
  // Implement your business logic here...

  try {
    let result = await messages.deleteMessagesByThreadIdDb(id);
    //delete this when you actually implement something.
    result.messages.push(
      "deleteMessagesByThreadId services not implemented yet"
    );
    result.locations.push("messages.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.patchMessagesByThreadId = async (id) => {
  // Implement your business logic here...

  try {
    let result = await messages.patchMessagesByThreadIdDb(id);
    //delete this when you actually implement something.
    result.messages.push(
      "patchMessagesByThreadId services not implemented yet"
    );
    result.locations.push("messages.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getMessagesHistoryByAdminId = async (admin_id) => {
  // Implement your business logic here...

  try {
    let result = await messages.getMessagesHistoryByAdminIdDb(admin_id);
    //delete this when you actually implement something.
    result.messages.push(
      "getMessagesHistoryByAdminId services not implemented yet"
    );
    result.locations.push("messages.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postMessagesReplyByThreadId = async (thread_id) => {
  // Implement your business logic here...

  try {
    let result = await messages.postMessagesReplyByThreadIdDb(thread_id);
    //delete this when you actually implement something.
    result.messages.push(
      "postMessagesReplyByThreadId services not implemented yet"
    );
    result.locations.push("messages.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
