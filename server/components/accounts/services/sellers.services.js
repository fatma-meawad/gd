const sellers = require("../db/sellers.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.getSellers = async (
  businessId,
  limit,
  offset,
  searchSellerName
) => {
  // Implement your business logic here...

  try {
    let result = await sellers.getSellersDb(
      businessId,
      limit,
      offset,
      searchSellerName
    );
    //delete this when you actually implement something.
    result.messages.push("getSellers services not implemented yet");
    result.locations.push("sellers.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getSellersBySellerIdAccessHistory = async (seller_id) => {
  // Implement your business logic here...

  try {
    let result = await sellers.getSellersBySellerIdAccessHistoryDb(seller_id);
    //delete this when you actually implement something.
    result.messages.push(
      "getSellersBySellerIdAccessHistory services not implemented yet"
    );
    result.locations.push("sellers.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postSellersInactiveNotifications = async () => {
  // Implement your business logic here...

  try {
    let result = await sellers.postSellersInactiveNotificationsDb();
    //delete this when you actually implement something.
    result.messages.push(
      "postSellersInactiveNotifications services not implemented yet"
    );
    result.locations.push("sellers.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
