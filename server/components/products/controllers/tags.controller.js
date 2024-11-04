const asyncHandler = require("express-async-handler");
const tags = require("../services/tags.services");
const AppError = require("../../../utils/error");

exports.getTags = asyncHandler(async (req, res) => {
  const options = {
    product_id: req.query["product_id"],
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
  let result = await tags.getTags(...Object.values(options));

  // Temporary response
  result.messages.push("getTags controller not implemented yet");
  result.locations.push("tags.controller.js");
  res.status(200).send(result);
});

exports.postTags = asyncHandler(async (req, res) => {
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
  let result = await tags.postTags(...Object.values(options));

  // Temporary response
  result.messages.push("postTags controller not implemented yet");
  result.locations.push("tags.controller.js");
  res.status(200).send(result);
});
