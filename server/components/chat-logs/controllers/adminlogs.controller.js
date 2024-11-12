const asyncHandler = require("express-async-handler");
const adminlogs = require("../services/adminlogs.services");
const AppError = require("../../../utils/error");

exports.getAdminlogs = asyncHandler(async (req, res) => {
  const options = {
    admin_id: req.query["admin_id"],
    keyword: req.query["keyword"],
    date_range: req.query["date_range"],
    sort_by: req.query["sort_by"],
    order: req.query["order"],
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
  let result = await adminlogs.getAdminlogs(...Object.values(options));

  // Temporary response
  result.messages.push("getAdminlogs controller not implemented yet");
  result.locations.push("adminlogs.controller.js");
  res.status(200).send(result);
});

exports.postAdminlogs = asyncHandler(async (req, res) => {
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
  let result = await adminlogs.postAdminlogs(...Object.values(options));

  // Temporary response
  result.messages.push("postAdminlogs controller not implemented yet");
  result.locations.push("adminlogs.controller.js");
  res.status(200).send(result);
});
