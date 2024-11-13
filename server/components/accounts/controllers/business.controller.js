const asyncHandler = require("express-async-handler");
const businessService = require("../services/business.services");
const AppError = require("../../../utils/error");

exports.postBusiness = asyncHandler(async (req, res) => {
  const {
    title,
    image,
    phone,
    address,
    web_address,
    main_owner_name,
    main_owner_email,
    main_owner_phone,
  } = req.body;

  // Validation checks for 400 error handling
  const errors = [];
  if (!title) errors.push("Title is required");
  if (!image) errors.push("Image URL is required");
  if (!phone) errors.push("Phone is required");
  if (!address) errors.push("Address is required");
  if (!web_address) errors.push("Web address is required");
  if (!main_owner_name) errors.push("Main owner name is required");
  if (!main_owner_email || !main_owner_email.includes("@"))
    errors.push("Valid main owner email is required");
  if (!main_owner_phone) errors.push("Main owner phone is required");

  // If validation errors are found, return 400 response
  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      errors,
      locations: ["business.controller.js"],
    });
  }

  try {
    // Call the service layer function (or mock) to handle creation logic
    const result = await businessService.postBusiness(req.body);

    // Check for successful result
    if (result && result.new_id) {
      res.status(201).json({ new_id: result.new_id }); // 201 on successful creation
    } else {
      // If no result ID is returned, throw a controlled 500 error
      throw new AppError({
        message: "Business creation failed",
        statusCode: 500,
        errors: ["Failed to create new business"],
        locations: ["business.controller.js", "business.services.js"],
      });
    }
  } catch (error) {
    // Handling other unexpected errors with 500 response
    res.status(error.statusCode || 500).json({
      status: "error",
      errors: [error.message || "An unexpected error occurred"],
      locations: ["business.controller.js", "business.services.js"],
    });
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
