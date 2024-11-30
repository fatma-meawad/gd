const asyncHandler = require("express-async-handler");
const categories = require("../services/categories.services");
const AppError = require("../../../utils/error");

exports.getCategories = asyncHandler(async (req, res) => {
  const options = {};

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await categories.getCategories(...Object.values(options));

  // Temporary response
  result.messages.push("getCategories controller not implemented yet");
  result.locations.push("categories.controller.js");
  res.status(200).send(result);
});

exports.postCategories = asyncHandler(async (req, res) => {
  const options = {
    title: req.body.title,
    photo_url: req.body.photo_url,
    description: req.body.description,
  };

  // Code to simulate 401 error

  const headers = req.headers;
  if (!headers.auth) {
    const result = {
      message: '"auth" header is missing',
      status: 401,
      errors: ["401 unauthorized"],
      locations: ["categories.controller.js"],
    };

    res.status(401).send(result);
  }

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await categories.postCategories(...Object.values(options));

  res.status(200).send(result);
});

exports.putCategoriesById = asyncHandler(async (req, res) => {
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
  let result = await categories.putCategoriesById(...Object.values(options));

  // Temporary response
  result.messages.push("putCategoriesById controller not implemented yet");
  result.locations.push("categories.controller.js");
  res.status(200).send(result);
});

exports.deleteCategoriesById = asyncHandler(async (req, res) => {
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
  let result = await categories.deleteCategoriesById(...Object.values(options));

  // Temporary response
  result.messages.push("deleteCategoriesById controller not implemented yet");
  result.locations.push("categories.controller.js");
  res.status(200).send(result);
});

exports.getCategoriesProducts = asyncHandler(async (req, res) => {
  const options = {
    categoryId: req.query["categoryId"],
    businessAccountId: req.query["businessAccountId"],
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
  let result = await categories.getCategoriesProducts(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push("getCategoriesProducts controller not implemented yet");
  result.locations.push("categories.controller.js");
  res.status(200).send(result);
});

exports.getCategoriesLookups = asyncHandler(async (req, res) => {
  const options = {};

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await categories.getCategoriesLookups(...Object.values(options));

  // Temporary response
  result.messages.push("getCategoriesLookups controller not implemented yet");
  result.locations.push("categories.controller.js");
  res.status(200).send(result);
});
