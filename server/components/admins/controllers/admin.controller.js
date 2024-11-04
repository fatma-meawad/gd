const asyncHandler = require("express-async-handler");
const admin = require("../services/admin.services");
const AppError = require("../../../utils/error");

exports.getAdminLogs = asyncHandler(async (req, res) => {
  const options = {
    page: req.query["page"],
    limit: req.query["limit"],
    startDate: req.query["startDate"],
    endDate: req.query["endDate"],
    user: req.query["user"],
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
  let result = await admin.getAdminLogs(...Object.values(options));

  // Temporary response
  result.messages.push("getAdminLogs controller not implemented yet");
  result.locations.push("admin.controller.js");
  res.status(200).send(result);
});

exports.getAdminExport = asyncHandler(async (req, res) => {
  const options = {
    format: req.query["format"],
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
  let result = await admin.getAdminExport(...Object.values(options));

  // Temporary response
  result.messages.push("getAdminExport controller not implemented yet");
  result.locations.push("admin.controller.js");
  res.status(200).send(result);
});

exports.putAdminImport = asyncHandler(async (req, res) => {
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
  let result = await admin.putAdminImport(...Object.values(options));

  // Temporary response
  result.messages.push("putAdminImport controller not implemented yet");
  result.locations.push("admin.controller.js");
  res.status(200).send(result);
});
