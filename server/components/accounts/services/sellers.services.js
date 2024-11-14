const sellers = require("../db/sellers.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

<<<<<<< HEAD
module.exports.getSellers = async (businessId, limit, offset, searchSellerName) => {
=======
module.exports.getSellers = async (
  businessId,
  limit,
  offset,
  searchSellerName
) => {
>>>>>>> 52c406ed2d71de0c902189fe242af2905571988d
  try {
    let result = await sellers.getSellersDb({
      businessId,
      limit,
      offset,
      searchSellerName,
    });

    if (!result.messages) {
      result.messages = [];
    }
    result.messages.push("getSellers services executed successfully");
    result.locations = ["sellers.services.js"];

    return result;
  } catch (error) {
    throw new AppError(error.message || "Error in getSellers", 500);
  }
};

module.exports.getSellersBySellerIdAccessHistory = async (seller_id) => {
  try {
    let result = await sellers.getSellersBySellerIdAccessHistoryDb(seller_id);

    if (!result.messages) {
      result.messages = [];
    }
    result.messages.push(
      "getSellersBySellerIdAccessHistory services executed successfully"
    );
    result.locations = ["sellers.services.js"];

    return result;
  } catch (error) {
    throw new AppError(
      error.message || "Error in getSellersBySellerIdAccessHistory",
      500
    );
  }
};

module.exports.postSellersInactiveNotifications = async (inactivity_period) => {
  try {
    let result = await sellers.postSellersInactiveNotificationsDb(
      inactivity_period
    );

    if (!result.messages) {
      result.messages = [];
    }
    result.messages.push(
      "postSellersInactiveNotifications services executed successfully"
    );
    result.locations = ["sellers.services.js"];

    return result;
  } catch (error) {
    throw new AppError(
      error.message || "Error in postSellersInactiveNotifications",
      500
    );
  }
};
