const asyncHandler = require("express-async-handler");
const products = require("../services/products.services");
const AppError = require("../../../utils/error");
const { CONTROLLER_FILE, STATUS_CODES } = require("./utils");

exports.getProducts = asyncHandler(async (req, res) => {
  let limit;
  let cursor;

  if (req.query) {
    if (req.query.limit) {
      if (isNaN(+req.query.limit)) {
        throw new AppError({
          message: "Limit should be a number",
          statusCode: STATUS_CODES.BAD_REQUEST,
          errors: ["Limit should be a number"],
          locations: [CONTROLLER_FILE],
        });
      }
      if (req.query.limit < 1) {
        throw new AppError({
          message: "Limit should be greater than 0",
          statusCode: STATUS_CODES.BAD_REQUEST,
          errors: ["Limit should be greater than 0"],
          locations: [CONTROLLER_FILE],
        });
      }
      limit = req.query.limit;
    }
    if (req.query.cursor) {
      cursor = req.query.cursor;
    }
  }

  const headers = req.headers;
  if (!headers.auth) {
    throw new AppError({
      message: '"auth" header is missing',
      statusCode: STATUS_CODES.UNAUTHORIZED,
      errors: ['"auth" header is missing'],
      locations: [CONTROLLER_FILE],
    });
  }

  const result = await products.getProducts(limit, cursor);

  res.status(STATUS_CODES.OK).send(result);
});

exports.postProducts = asyncHandler(async (req, res) => {
  const options = {
    product_name: req.product_name,
    category_id: req.category_id,
    category_name: req.category_name,
    short_description: req.short_description,
    detailed_description: req.detailed_description,
    product_photos: req.product_photos,
    product_url: req.product_url,
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

  const headers = req.headers;
  if (!headers.auth) {
    const result = {
      message: "Authentification header is missing",
      status: "401",
      errors: ["401 unauthorized"],
      locations: [CONTROLLER_FILE],
    };
    res.status(401).send(result);
  }

  // let result = await products.postProducts(
  //   options.product_name,
  //   options.category_id,
  //   options.category_name,
  //   options.short_description,
  //   options.detailed_description,
  //   options.product_photos,
  //   options.product_url
  // options//
  // );

  // // Temporary response
  result.messages.push("postProducts controller not implemented yet");
  result.locations.push(CONTROLLER_FILE);
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
  result.locations.push(CONTROLLER_FILE);
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
  result.locations.push(CONTROLLER_FILE);
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
  result.locations.push(CONTROLLER_FILE);
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
  result.locations.push(CONTROLLER_FILE);
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
  result.locations.push(CONTROLLER_FILE);
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
  result.locations.push(CONTROLLER_FILE);
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
  result.locations.push(CONTROLLER_FILE);
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
  result.locations.push(CONTROLLER_FILE);
  res.status(200).send(result);
});
