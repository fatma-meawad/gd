const businesses = require("../db/businesses.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.postBusinesses = async (businessesData) => {
  const {
    title,
    image,
    phone,
    address,
    main_owner_name,
    main_owner_email,
    main_owner_phone,
  } = businessesData;

  // Validation logic
  if (
    !title ||
    !image ||
    !phone ||
    !address ||
    !main_owner_name ||
    !main_owner_email ||
    !main_owner_phone
  ) {
    throw new AppError({
      message: "Validation error: Missing required fields",
      statusCode: 400,
      errors: ["Missing required fields"],
      locations: ["businesses.services.js"],
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(main_owner_email)) {
    throw new AppError({
      message: "Validation error: Invalid email format",
      statusCode: 400,
      errors: ["Invalid email format"],
      locations: ["businesses.services.js"],
    });
  }
  
  try {
    // Simulate a mock response for successful insertion
    const mockResult = { new_id: "mock-business-id-123" };
    return mockResult;

    // Uncomment below if you want to simulate a service-level error
    // throw new AppError({
    //   message: "Mock database error",
    //   statusCode: 500,
    //   errors: ["Simulated database error"],
    //   locations: ["businesses.services.js"],
    // });

  } catch (error) {
    // Handle errors by re-throwing with an AppError
    throw new AppError({
      message: error.message || "Unexpected error",
      statusCode: 500,
      errors: ["Unexpected service error occurred"],
      locations: ["businesses.services.js"],
    });
  }
};

module.exports.getBusinesses = async ({ limit, offset }) => {
  try {
    const result = await businesses.getBusinessesDb({ limit, offset });

    // Return the result directly, even if it's empty
    return result;
  } catch (error) {
    throw new AppError({
      status: "error",
      statusCode: 500,
      message: error.message || "Internal server error",
      locations: ["businesses.services.js"],
    });
  }
};

module.exports.putBusinessById = async (id) => {
  // Implement your business logic here...

  try {
    let result = await businesses.putBusinessByIdDb(id);
    //delete this when you actually implement something.
    result.messages.push("putBusinessById services not implemented yet");
    result.locations.push("businesses.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getBusinessByBusinessIdLocationId = async (business_id) => {
  // Implement your business logic here...

  try {
    let result = await businesses.getBusinessByBusinessIdLocationIdDb(
      business_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "getBusinessByBusinessIdLocationId services not implemented yet"
    );
    result.locations.push("businesses.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postBusinessByBusinessIdSellers = async (business_id) => {
  // Implement your business logic here...

  try {
    let result = await businesses.postBusinessByBusinessIdSellersDb(
      business_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "postBusinessByBusinessIdSellers services not implemented yet"
    );
    result.locations.push("businesses.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postBusinessByBusinessIdBySellerIdSellers = async (
  business_id,
  seller_id
) => {
  // Implement your business logic here...

  try {
    let result = await businesses.postBusinessByBusinessIdBySellerIdSellersDb(
      business_id,
      seller_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "postBusinessByBusinessIdBySellerIdSellers services not implemented yet"
    );
    result.locations.push("businesses.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getBusinessByBusinessIdSellersExport = async (business_id) => {
  // Implement your business logic here...

  try {
    let result = await businesses.getBusinessByBusinessIdSellersExportDb(
      business_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "getBusinessByBusinessIdSellersExport services not implemented yet"
    );
    result.locations.push("businesses.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postBusinessByBusinessIdSellersImport = async (business_id) => {
  // Implement your business logic here...

  try {
    let result = await businesses.postBusinessByBusinessIdSellersImportDb(
      business_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "postBusinessByBusinessIdSellersImport services not implemented yet"
    );
    result.locations.push("businesses.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
