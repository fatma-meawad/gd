const asyncHandler = require("express-async-handler");
const products = require("../services/products.services");
const AppError = require("../../../utils/error");

exports.getProducts = asyncHandler(async (req, res) => {
  let limit = 20;
  let cursor = null;
  if (req.query) {
    if (req.query.limit) {
      limit = req.query.limit;
    }
    if (req.query.cursor) {
      cursor = req.query.cursor;
    }
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

  /**
    Access Control: Verify that the requester is authorized to access the requested data.
   */
  const headers = req.headers;
  if (!headers.auth) {
    throw new AppError({
      message: '"auth" header is missing',
      statusCode: 401,
      errors: ['"header" is missing'],
      locations: ["products.controller.js"],
    });
  }

  let result = await products.getProducts(limit, cursor);

  res.status(200).send(result);
});

exports.postProducts = asyncHandler(async (req, res) => {
  const headers = req.headers;
  
  if (!headers.auth) {
      return res.status(401).json({
          status: "error",
          message: "Authentication header is missing",
          errors: ["401 Unauthorized"],
          locations: ["products.controller.js"],
      });
  }

  const { 
      product_name, 
      category_id, 
      // category_name, 
      short_description, 
      detailed_description, 
      // product_photos, 
      product_url 
  } = req.body;

  if (!product_name || !category_id || !short_description) {
      return res.status(400).json({
          status: "error",
          message: "Missing required fields",
          errors: ["Invalid input"],
          locations: ["products.controller.js"],
      });
  }

  if (
      typeof product_name !== "string" || 
      typeof category_id !== "number" || 
      typeof short_description !== "string"
  ) {
      return res.status(400).json({
          status: "error",
          message: "Invalid data types",
          errors: ["Invalid input"],
          locations: ["products.controller.js"],
      });
  }

  const options = {
      product_name,
      category_id,
      // category_name,
      short_description,
      detailed_description,
      // product_photos,
      product_url,
  };

  try {
      let result = await products.postProducts(
          options.product_name,
          options.category_id,
          // options.category_name,
          options.short_description,
          options.detailed_description,
          // options.product_photos,
          options.product_url
      );
      
      res.status(200).json({result});
  } catch (error) {
      throw new AppError("Error creating product", 500, {
          originalError: error,
          locations: ["products.controller.js"],
      });
  }
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
