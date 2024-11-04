const asyncHandler = require("express-async-handler");
const sellers = require("../services/sellers.services");
const AppError = require("../../../utils/error");

exports.getSellers = asyncHandler(async (req, res) => {
  const options = {
    businessId: req.query["businessId"],
    limit: req.query["limit"],
    offset: req.query["offset"],
    searchSellerName: req.query["searchSellerName"],
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
  let result = await sellers.getSellers(...Object.values(options));

  // Temporary response
  result.messages.push("getSellers controller not implemented yet");
  result.locations.push("sellers.controller.js");
  res.status(200).send(result);
});

exports.getSellersBySellerIdAccessHistory = asyncHandler(async (req, res) => {
  const options = {
    seller_id: req.params["seller_id"],
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
  let result = await sellers.getSellersBySellerIdAccessHistory(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "getSellersBySellerIdAccessHistory controller not implemented yet"
  );
  result.locations.push("sellers.controller.js");
  res.status(200).send(result);
});

exports.postSellersInactiveNotifications = asyncHandler(async (req, res) => {
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
  let result = await sellers.postSellersInactiveNotifications(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "postSellersInactiveNotifications controller not implemented yet"
  );
  result.locations.push("sellers.controller.js");
  res.status(200).send(result);
});
