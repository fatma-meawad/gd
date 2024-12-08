const asyncHandler = require("express-async-handler");
const businessesService = require("../services/businesses.services");
const AppError = require("../../../utils/error");

// Constants
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_OK = 200;
const STATUS_INTERNAL_SERVER_ERROR = 500;
const ERROR_LOCATIONS_CONTROLLER = ["businesses.controller.js"];
const ERROR_NO_BUSINESSES_FOUND = "No businesses found";
const ERROR_INTERNAL_SERVER = "Internal server error";

/**
 * POST /businesses
 * Handles creation of a new business
 */
exports.postBusinesses = asyncHandler(async (req, res) => {
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
  if (!main_owner_email || !main_owner_email.includes("@")) {
    errors.push("Valid main owner email is required");
  }
  if (!main_owner_phone) errors.push("Main owner phone is required");

  // If validation errors are found, return 400 response
  if (errors.length > 0) {
    return res.status(400).json({
      status: "error",
      errors,
      locations: ["businesses.controller.js", "businesses.services.js"],
    });
  }

  try {
    // Call the service layer function to handle creation logic
    const result = await businessesService.postBusinesses(req.body);

    // Check for successful result
    if (result && result.new_id) {
      return res.status(201).json({ new_id: result.new_id }); // 201 on successful creation
    } else {
      // If no result ID is returned, throw a controlled 500 error
      throw new AppError({
        message: "Business creation failed",
        statusCode: 500,
        errors: ["Failed to create new business"],
        locations: ["businesses.controller.js", "businesses.services.js"],
      });
    }
  } catch (error) {
    // Handling other unexpected errors with 500 response
    res.status(error.statusCode || 500).json({
      status: "error",
      errors: [error.message || "An unexpected error occurred"],
      locations: ["businesses.controller.js", "businesses.services.js"],
    });
  }
});

/**
 * GET /businesses
 * Retrieves a list of businesses with pagination support
 */
exports.getBusinesses = asyncHandler(async (req, res) => {
  const { limit = 50, offset = 0 } = req.query;

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  if (isNaN(parsedLimit) || parsedLimit <= 0) {
    return res.status(STATUS_BAD_REQUEST).json({
      status: "error",
      errors: ["Limit must be a positive integer"],
      locations: ERROR_LOCATIONS_CONTROLLER,
    });
  }

  if (isNaN(parsedOffset) || parsedOffset < 0) {
    return res.status(STATUS_BAD_REQUEST).json({
      status: "error",
      errors: ["Offset must be a non-negative integer"],
      locations: ERROR_LOCATIONS_CONTROLLER,
    });
  }

  try {
    const result = await businessesService.getBusinesses({
      limit: parsedLimit,
      offset: parsedOffset,
    });

    // Check for empty results and send a 404 response
    if (!result.businesses || result.businesses.length === 0) {
      return res.status(STATUS_NOT_FOUND).json({
        status: "error",
        errors: [ERROR_NO_BUSINESSES_FOUND],
        locations: ERROR_LOCATIONS_CONTROLLER,
      });
    }

    return res.status(STATUS_OK).json(result);
  } catch (error) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({
      status: "error",
      errors: [ERROR_INTERNAL_SERVER],
      locations: ERROR_LOCATIONS_CONTROLLER,
    });
  }
});

/**
 * PUT /businesses/:id
 * Updates a business by its ID
 */
exports.putBusinessesById = asyncHandler(async (req, res) => {
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
  let result = await businessesService.putBusinessesById(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push("putBusinessesById controller not implemented yet");
  result.locations.push("businesses.controller.js");
  res.status(200).send(result);
});

/**
 * GET /businesses/:business_id/location_id
 * Retrieves business location details by business ID
 */
exports.getBusinessByBusinessIdLocationId = asyncHandler(async (req, res) => {
  const options = {
    businesses_id: req.params["businesses_id"],
  };

  let result = await businessesService.getBusinessByBusinessIdLocationId(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "getBusinessByBusinessIdLocationId controller not implemented yet"
  );
  result.locations.push("businesses.controller.js");
  res.status(200).send(result);
});

/**
 * POST /businesses/:business_id/sellers
 * Adds a seller to a business by business ID
 */
exports.postBusinessByBusinessIdSellers = asyncHandler(async (req, res) => {
  const options = {
    businesses_id: req.params["businesses_id"],
    body: req.body,
  };

  let result = await businessesService.postBusinessByBusinessIdSellers(
    ...Object.values(options)
  );

  result.messages.push(
    "postBusinessByBusinessIdSellers controller not implemented yet"
  );
  result.locations.push("businesses.controller.js");
  res.status(200).send(result);
});

/**
 * POST /businesses/:business_id/sellers/:seller_id
 * Creates an account for a seller with QR code by business and seller IDs
 */
exports.postBusinessByBusinessIdBySellerIdSellers = asyncHandler(
  async (req, res) => {
    const options = {
      business_id: req.params["business_id"],
      seller_id: req.params["seller_id"],
    };

    let result =
      await businessesService.postBusinessByBusinessIdBySellerIdSellers(
        ...Object.values(options)
      );

    result.messages.push(
      "postBusinessByBusinessIdBySellerIdSellers controller not implemented yet"
    );
    result.locations.push("businesses.controller.js");
    res.status(200).send(result);
  }
);

/**
 * GET /businesses/:business_id/sellers/export
 * Exports sellers for a business by business ID
 */
exports.getBusinessByBusinessIdSellersExport = asyncHandler(
  async (req, res) => {
    const options = {
      business_id: req.params["business_id"],
    };

    let result = await businessesService.getBusinessByBusinessIdSellersExport(
      ...Object.values(options)
    );

    result.messages.push(
      "getBusinessByBusinessIdSellersExport controller not implemented yet"
    );
    result.locations.push("businesses.controller.js");
    res.status(200).send(result);
  }
);

/**
 * POST /businesses/:business_id/sellers/import
 * Imports sellers for a business by business ID
 */
exports.postBusinessByBusinessIdSellersImport = asyncHandler(
  async (req, res) => {
    const options = {
      business_id: req.params["business_id"],
      body: req.body,
    };

    let result = await businessesService.postBusinessByBusinessIdSellersImport(
      ...Object.values(options)
    );

    result.messages.push(
      "postBusinessByBusinessIdSellersImport controller not implemented yet"
    );
    result.locations.push("businesses.controller.js");
    res.status(200).send(result);
  }
);
