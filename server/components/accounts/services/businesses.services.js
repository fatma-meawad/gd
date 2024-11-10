const businesses = require("../db/businesses.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.postBusiness = async () => {
  // Implement your business logic here...

  try {
    let result = await business.postBusinessDb();
    //delete this when you actually implement something.
    result.messages.push("postBusiness services not implemented yet");
    result.locations.push("businesses.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

/*module.exports.getBusiness = async () => {
  // Implement your business logic here...

  try {
    let result = await business.getBusinessDb();
    //delete this when you actually implement something.
    result.messages.push("getBusiness services not implemented yet");
    result.locations.push("businesses.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};*/

module.exports.getBusinesses = async ({ limit, offset }) => {
  try {
    const result = await businesses.getBusinessesDb({ limit, offset }); // use function getBusinessesDb_dummy to test my Pull Request or if you need GET /businesses to return dummy results for your own tests, while the db is not setup
    
    // Return the result directly, even if it's empty
    return result;
  } catch (error) {
    throw new AppError({
      status: "error",
      statusCode: 500,
      message: error.message || "Internal server error",
      locations: ["businesses.services.js"]
    });
  }
};

module.exports.putBusinessById = async (id) => {
  // Implement your business logic here...

  try {
    let result = await business.putBusinessByIdDb(id);
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
    let result = await business.getBusinessByBusinessIdLocationIdDb(
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
    let result = await business.postBusinessByBusinessIdSellersDb(business_id);
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
    let result = await business.postBusinessByBusinessIdBySellerIdSellersDb(
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
    let result = await business.getBusinessByBusinessIdSellersExportDb(
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
    let result = await business.postBusinessByBusinessIdSellersImportDb(
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
