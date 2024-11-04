const asyncHandler = require("express-async-handler");
const subcategories = require("../services/subcategories.services");
const AppError = require("../../../utils/error");

exports.getSubcategories = asyncHandler(async (req, res) => {
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
  let result = await subcategories.getSubcategories(...Object.values(options));

  // Temporary response
  result.messages.push("getSubcategories controller not implemented yet");
  result.locations.push("subcategories.controller.js");
  res.status(200).send(result);
});

exports.postSubcategories = asyncHandler(async (req, res) => {
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
  let result = await subcategories.postSubcategories(...Object.values(options));

  // Temporary response
  result.messages.push("postSubcategories controller not implemented yet");
  result.locations.push("subcategories.controller.js");
  res.status(200).send(result);
});

exports.getSubcategoriesByCategoryId = asyncHandler(async (req, res) => {
  const options = {
    category_id: req.params["category_id"],
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
  let result = await subcategories.getSubcategoriesByCategoryId(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "getSubcategoriesByCategoryId controller not implemented yet"
  );
  result.locations.push("subcategories.controller.js");
  res.status(200).send(result);
});

exports.putSubcategoriesById = asyncHandler(async (req, res) => {
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
  let result = await subcategories.putSubcategoriesById(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push("putSubcategoriesById controller not implemented yet");
  result.locations.push("subcategories.controller.js");
  res.status(200).send(result);
});

exports.deleteSubcategoriesById = asyncHandler(async (req, res) => {
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
  let result = await subcategories.deleteSubcategoriesById(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "deleteSubcategoriesById controller not implemented yet"
  );
  result.locations.push("subcategories.controller.js");
  res.status(200).send(result);
});
