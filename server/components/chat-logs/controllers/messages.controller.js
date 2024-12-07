const asyncHandler = require("express-async-handler");
const messages = require("../services/messages.services");
const AppError = require("../../../utils/error");

exports.postMessages = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { sender_id, recipient_id, thread, content } = req.body;
  // console.log("Controller inputs: ", sender_id, recipient_id, thread, content);

  const headers = req.headers;
  if (!headers.auth || headers.auth === "123") {
    throw new AppError({
      message: '"auth" header is missing',
      statuscode: 401,
      errors: ['"auth" header is missing'],
      locations: [messages.controller.js],
    });
  }
  
  try {
    const result = await messages.postMessages(sender_id, recipient_id, thread, content);
    // console.log("controller result: ", result);
    return res.status(200).json(result);
  } catch (error) {
    throw new AppError({statuscode: 500, messages: "Message could not be saved", location: [messages.controller.js]});
  }
});

exports.getMessagesByThread = asyncHandler(async (req, res) => {
  const options = {
    thread: req.params["thread"],
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await messages.getMessagesByThread(...Object.values(options));

  // Temporary response
  result.messages.push("getMessagesByThread controller not implemented yet");
  result.locations.push("messages.controller.js");
  res.status(200).send(result);
});

exports.deleteMessagesByThreadId = asyncHandler(async (req, res) => {
  const options = {
    id: req.params["id"],
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await messages.deleteMessagesByThreadId(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "deleteMessagesByThreadId controller not implemented yet"
  );
  result.locations.push("messages.controller.js");
  res.status(200).send(result);
});

exports.patchMessagesByThreadId = asyncHandler(async (req, res) => {
  const options = {
    id: req.params["id"],
    body: req.body,
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await messages.patchMessagesByThreadId(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "patchMessagesByThreadId controller not implemented yet"
  );
  result.locations.push("messages.controller.js");
  res.status(200).send(result);
});

exports.getMessagesHistoryByAdminId = asyncHandler(async (req, res) => {
  const options = {
    receiver_id: req.params["receiver_id"],
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await messages.getMessagesHistoryByAdminId(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "getMessagesHistoryByAdminId controller not implemented yet"
  );
  result.locations.push("messages.controller.js");
  res.status(200).send(result);
});

exports.postMessagesReplyByThreadId = asyncHandler(async (req, res) => {
  const options = {
    thread_id: req.params["thread_id"],
    body: req.body,
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await messages.postMessagesReplyByThreadId(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "postMessagesReplyByThreadId controller not implemented yet"
  );
  result.locations.push("messages.controller.js");
  res.status(200).send(result);
});
