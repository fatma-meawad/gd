const asyncHandler = require("express-async-handler");
const products = require("../services/products.services");
const AppError = require("../../../utils/error");

exports.getProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query["limit"]) || 20;
  const cursor = req.query["cursor"] || null;

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await products.getProducts(limit, cursor);

  res.status(200).send(result);
});

exports.postProducts = asyncHandler(async (req, res) => {
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
  let result = await products.postProducts(...Object.values(options));

  // Temporary response
  result.messages.push("postProducts controller not implemented yet");
  result.locations.push("products.controller.js");
  res.status(200).send(result);
});

exports.postProductsByProductIdTags = asyncHandler(async (req, res) => {
  const options = {
    product_id: req.params["product_id"],
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
  let result = await products.postProductsByProductIdTags(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "postProductsByProductIdTags controller not implemented yet"
  );
  result.locations.push("products.controller.js");
  res.status(200).send(result);
});

exports.postProductsByProductIdPrice = asyncHandler(async (req, res) => {
  const options = {
    product_id: req.params["product_id"],
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
  let result = await products.postProductsByProductIdPrice(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "postProductsByProductIdPrice controller not implemented yet"
  );
  result.locations.push("products.controller.js");
  res.status(200).send(result);
});

exports.postProductsByProductIdInventory = asyncHandler(async (req, res) => {
  const options = {
    product_id: req.params["product_id"],
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
  let result = await products.postProductsByProductIdInventory(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "postProductsByProductIdInventory controller not implemented yet"
  );
  result.locations.push("products.controller.js");
  res.status(200).send(result);
});

exports.postProductsBulkEdit = asyncHandler(async (req, res) => {
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
  let result = await products.postProductsBulkEdit(...Object.values(options));

  // Temporary response
  result.messages.push("postProductsBulkEdit controller not implemented yet");
  result.locations.push("products.controller.js");
  res.status(200).send(result);
});

exports.putProductsByIdExpirationDate = asyncHandler(async (req, res) => {
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
  let result = await products.putProductsByIdExpirationDate(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "putProductsByIdExpirationDate controller not implemented yet"
  );
  result.locations.push("products.controller.js");
  res.status(200).send(result);
});

exports.putProductsByIdDiscount = asyncHandler(async (req, res) => {
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
  let result = await products.putProductsByIdDiscount(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "putProductsByIdDiscount controller not implemented yet"
  );
  result.locations.push("products.controller.js");
  res.status(200).send(result);
});

exports.postProductsByProductIdPhotos = asyncHandler(async (req, res) => {
  const options = {
    product_id: req.params["product_id"],
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
  let result = await products.postProductsByProductIdPhotos(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "postProductsByProductIdPhotos controller not implemented yet"
  );
  result.locations.push("products.controller.js");
  res.status(200).send(result);
});

exports.getProductsByProductIdPhotos = asyncHandler(async (req, res) => {
  const options = {
    product_id: req.params["product_id"],
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
  let result = await products.getProductsByProductIdPhotos(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "getProductsByProductIdPhotos controller not implemented yet"
  );
  result.locations.push("products.controller.js");
  res.status(200).send(result);
});
