const messages = require("../db/messages.db");
const path = require("path");
const AppError = require("../../../utils/error");

module.exports.postMessages = async (sender_id, recipient_id, thread, content) => {
  // console.log("Service inputs: ", { sender_id, recipient_id, thread, content });

  try {
    return await messages.postMessagesDb(sender_id, recipient_id, thread, content);
  } catch (error) {
    throw new AppError({statuscode: 500, messages: "Message could not be saved", location: messages.services.js, error: error});
  }
};

module.exports.getMessagesByThread = async (thread) => {
  // Implement your business logic here...

  try {
    let result = await messages.getMessagesByThreadDb(thread);
    //delete this when you actually implement something.
    result.messages.push("getMessagesByThread services not implemented yet");
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
