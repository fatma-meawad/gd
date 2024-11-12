const sellers = require("../db/sellers.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.getSellers = async (
  businessId,
  limit,
  offset,
  searchSellerName
) => {
  // Simulazione dati
  return {
    sellers_list: [
      { id: "1", name: "Seller One", businessId: "123" },
      { id: "2", name: "Seller Two", businessId: "123" }
    ],
    pagination_info: { total: 2, limit: limit, offset: offset },
    messages: ["getSellers service response"],
    locations: ["sellers.services.js"]
  };
};

module.exports.getSellersBySellerIdAccessHistory = async (seller_id) => {
  // Simulazione dati di accesso
  return {
    accessHistory: [
      { date: "2023-11-01", action: "login" },
      { date: "2023-11-05", action: "purchase" }
    ],
    messages: ["getSellersBySellerIdAccessHistory response"],
    locations: ["sellers.services.js"]
  };
};

module.exports.postSellersInactiveNotifications = async () => {
  // Simulazione notifica
  return {
    notificationsSent: true,
    messages: ["postSellersInactiveNotifications service response"],
    locations: ["sellers.services.js"]
  };
};
