const asyncHandler = require("express-async-handler");
const products = require("../services/products.services");
const AppError = require("../../../utils/error");
const { StatusCodes } = require("http-status-codes")

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
      return res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "Authentication header is missing",
          errors: ["401 Unauthorized"],
          locations: ["products.controller.js"],
      });
  }

  const { 
      product_name: productName, 
      category_id: categoryId, 
      // category_name: categoryName, 
      short_description: shortDescription, 
      detailed_description: detailedDescription, 
      // product_photos: productPhotos, 
      product_url: productUrl 
  } = req.body;

  if (!productName || !categoryId || !shortDescription) {
      return res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "Missing required fields",
          errors: ["Invalid input"],
          locations: ["products.controller.js"],
      });
  }

  if (
      typeof productName !== "string" || 
      typeof categoryId !== "number" || 
      typeof shortDescription !== "string"
  ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
          status: "error",
          message: "Invalid data types",
          errors: ["Invalid input"],
          locations: ["products.controller.js"],
      });
  }

  const options = {
      productName,
      categoryId,
      // categoryName,
      shortDescription,
      detailedDescription,
      // productPhotos,
      productUrl
  };

  try {
      const result = await products.postProducts(
          options.productName,
          options.categoryId,
          // options.categoryName,
          options.shortDescription,
          options.detailedDescription,
          // options.productPhotos,
          options.productUrl
      );
      
      res.status(StatusCodes.OK).json({result});
  } catch (error) {
      throw new AppError("Error creating product", StatusCodes.INTERNAL_SERVER_ERROR, {
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
