const asyncHandler = require("express-async-handler");
const businesses = require("../services/businesses.services");
const AppError = require("../../../utils/error");

exports.postBusiness = asyncHandler(async (req, res) => {
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
  let result = await business.postBusiness(...Object.values(options));

  // Temporary response
  result.messages.push("postBusiness controller not implemented yet");
  result.locations.push("businesses.controller.js");
  res.status(200).send(result);
});

/**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
*/

/**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
*/
exports.getBusinesses = asyncHandler(async (req, res) => {
  const { limit = 50, offset = 0 } = req.query;
  
  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  if (isNaN(parsedLimit) || parsedLimit <= 0) {
    return res.status(400).json({
      status: "error",
      errors: ["Limit must be a positive integer"],
      locations: ["businesses.controller.js"]
    });
  }

  if (isNaN(parsedOffset) || parsedOffset < 0) {
    return res.status(400).json({
      status: "error",
      errors: ["Offset must be a non-negative integer"],
      locations: ["businesses.controller.js"]
    });
  }

  try {
    const result = await businesses.getBusinesses({ 
      limit: parsedLimit, 
      offset: parsedOffset 
    });

    // Check for empty results and send a 404 response
    if (!result.businesses || result.businesses.length === 0) {
      return res.status(404).json({
        status: "error",
        errors: ["No businesses found"],
        locations: ["businesses.controller.js"]
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      errors: ["Internal server error"],
      locations: ["businesses.controller.js"]
    });
  }
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
  result.locations.push("businesses.controller.js");
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
  result.locations.push("businesses.controller.js");
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
  result.locations.push("businesses.controller.js");
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
    result.locations.push("businesses.controller.js");
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
    result.locations.push("businesses.controller.js");
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
    result.locations.push("businesses.controller.js");
    res.status(200).send(result);
  }
);
