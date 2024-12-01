const asyncHandler = require("express-async-handler");
const messages = require("../services/messages.services");
const AppError = require("../../../utils/error");

exports.postMessages = asyncHandler(async (req, res) => {
  const options = {
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
  let result = await messages.postMessages(...Object.values(options));

  // Temporary response
  result.messages.push("postMessages controller not implemented yet");
  result.locations.push("messages.controller.js");
  res.status(200).send(result);
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
    admin_id: req.params["receiver_id"],
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
