const asyncHandler = require("express-async-handler");
const businessService = require("../services/business.services");
const AppError = require("../../../utils/error");

exports.postBusiness = asyncHandler(async (req, res) => {
  try {
    // Call the service layer function to handle the creation logic
    const result = await businessService.postBusiness(req.body);

    if (result && result.new_id) {
      res.status(201).json({ new_id: result.new_id, message: "Business created successfully" });
    } else {
      throw new AppError("Business creation failed", 500);
    }
  } catch (error) {
    const status = error.status || 500;
    const response = {
      status: status === 400 ? "Bad Request" : "Internal Server Error",
      errors: [error.message || "An unexpected error occurred"],
      locations: ["business.controller.js", "business.services.js"],
    };
    res.status(status).json(response);
  }
});

exports.getBusiness = asyncHandler(async (req, res) => {
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
  let result = await business.getBusiness(...Object.values(options));

  // Temporary response
  result.messages.push("getBusiness controller not implemented yet");
  result.locations.push("business.controller.js");
  res.status(200).send(result);
});

exports.putBusinessById = asyncHandler(async (req, res) => {
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
  let result = await business.putBusinessById(...Object.values(options));

  // Temporary response
  result.messages.push("putBusinessById controller not implemented yet");
  result.locations.push("business.controller.js");
  res.status(200).send(result);
});

exports.getBusinessByBusinessIdLocationId = asyncHandler(async (req, res) => {
  const options = {
    business_id: req.params["business_id"],
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
  let result = await business.getBusinessByBusinessIdLocationId(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "getBusinessByBusinessIdLocationId controller not implemented yet"
  );
  result.locations.push("business.controller.js");
  res.status(200).send(result);
});

exports.postBusinessByBusinessIdSellers = asyncHandler(async (req, res) => {
  const options = {
    business_id: req.params["business_id"],
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
  let result = await business.postBusinessByBusinessIdSellers(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "postBusinessByBusinessIdSellers controller not implemented yet"
  );
  result.locations.push("business.controller.js");
  res.status(200).send(result);
});

exports.postBusinessByBusinessIdBySellerIdSellers = asyncHandler(
  async (req, res) => {
    const options = {
      business_id: req.params["business_id"],
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
    let result = await business.postBusinessByBusinessIdBySellerIdSellers(
      ...Object.values(options)
    );

    // Temporary response
    result.messages.push(
      "postBusinessByBusinessIdBySellerIdSellers controller not implemented yet"
    );
    result.locations.push("business.controller.js");
    res.status(200).send(result);
  }
);

exports.getBusinessByBusinessIdSellersExport = asyncHandler(
  async (req, res) => {
    const options = {
      business_id: req.params["business_id"],
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
    let result = await business.getBusinessByBusinessIdSellersExport(
      ...Object.values(options)
    );

    // Temporary response
    result.messages.push(
      "getBusinessByBusinessIdSellersExport controller not implemented yet"
    );
    result.locations.push("business.controller.js");
    res.status(200).send(result);
  }
);

exports.postBusinessByBusinessIdSellersImport = asyncHandler(
  async (req, res) => {
    const options = {
      business_id: req.params["business_id"],
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
    let result = await business.postBusinessByBusinessIdSellersImport(
      ...Object.values(options)
    );

    // Temporary response
    result.messages.push(
      "postBusinessByBusinessIdSellersImport controller not implemented yet"
    );
    result.locations.push("business.controller.js");
    res.status(200).send(result);
  }
);
