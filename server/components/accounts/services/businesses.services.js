const business = require("../db/businesses.db");
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
    const result = await businesses.getBusinessesDb({ limit, offset });

    if (!result.businesses.length) {
      throw new AppError("No businesses found", 404);
    }

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
