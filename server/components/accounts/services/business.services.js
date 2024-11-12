const business = require("../db/business.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.postBusiness = async (businessData) => {
  // Validate required fields (validation can also stay in the controller if preferred)
  const { title, image, phone, address, main_owner_name, main_owner_email, main_owner_phone } = businessData;
  
  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(main_owner_email)) {
    throw new AppError("Validation error: Invalid email format", 400);
  }

  // Call database function
  try {
    const result = await businessDb.postBusinessDb(businessData);  // Pass businessData to DB layer
    return result;  // Expected to return { new_id: "some_id" }
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

module.exports.getBusiness = async () => {
  // Implement your business logic here...

  try {
    let result = await business.getBusinessDb();
    //delete this when you actually implement something.
    result.messages.push("getBusiness services not implemented yet");
    result.locations.push("business.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.putBusinessById = async (id) => {
  // Implement your business logic here...

  try {
    let result = await business.putBusinessByIdDb(id);
    //delete this when you actually implement something.
    result.messages.push("putBusinessById services not implemented yet");
    result.locations.push("business.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getBusinessByBusinessIdLocationId = async (business_id) => {
  // Implement your business logic here...

  try {
    let result = await business.getBusinessByBusinessIdLocationIdDb(
      business_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "getBusinessByBusinessIdLocationId services not implemented yet"
    );
    result.locations.push("business.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postBusinessByBusinessIdSellers = async (business_id) => {
  // Implement your business logic here...

  try {
    let result = await business.postBusinessByBusinessIdSellersDb(business_id);
    //delete this when you actually implement something.
    result.messages.push(
      "postBusinessByBusinessIdSellers services not implemented yet"
    );
    result.locations.push("business.services.js");

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
    let result = await business.postBusinessByBusinessIdBySellerIdSellersDb(
      business_id,
      seller_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "postBusinessByBusinessIdBySellerIdSellers services not implemented yet"
    );
    result.locations.push("business.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getBusinessByBusinessIdSellersExport = async (business_id) => {
  // Implement your business logic here...

  try {
    let result = await business.getBusinessByBusinessIdSellersExportDb(
      business_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "getBusinessByBusinessIdSellersExport services not implemented yet"
    );
    result.locations.push("business.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postBusinessByBusinessIdSellersImport = async (business_id) => {
  // Implement your business logic here...

  try {
    let result = await business.postBusinessByBusinessIdSellersImportDb(
      business_id
    );
    //delete this when you actually implement something.
    result.messages.push(
      "postBusinessByBusinessIdSellersImport services not implemented yet"
    );
    result.locations.push("business.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
