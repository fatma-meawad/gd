const asyncHandler = require("express-async-handler");
const sellers = require("../services/sellers.services");
const AppError = require("../../../utils/error");

exports.getSellers = asyncHandler(async (req, res, next) => {
  try {
    const options = {
      businessId: req.query["businessId"],
      limit: parseInt(req.query["limit"], 10) || 50, // Default limit
      offset: parseInt(req.query["offset"], 10) || 0, // Default offset
      searchSellerName: req.query["searchSellerName"],
    };

    const result = await sellers.getSellers(options);

    if (!result || result.sellers_list.length === 0) {
      return next(new AppError("No sellers found", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    next(new AppError("Failed to retrieve sellers", 500));
  }
});

exports.getSellersBySellerIdAccessHistory = asyncHandler(async (req, res, next) => {
  try {
    const seller_id = req.params["seller_id"];

    if (!seller_id) {
      return next(new AppError("Seller ID is required", 400));
    }

    const result = await sellers.getSellersBySellerIdAccessHistory(seller_id);

    if (!result || result.access_history.length === 0) {
      return next(new AppError("No access history found for this seller", 404));
    }

    res.status(200).json(result);
  } catch (error) {
    next(new AppError("Failed to retrieve access history", 500));
  }
});

exports.postSellersInactiveNotifications = asyncHandler(async (req, res, next) => {
  try {
    const { inactivity_period } = req.body;

    if (typeof inactivity_period !== "number" || inactivity_period <= 0) {
      return next(new AppError("Invalid inactivity period", 400));
    }

    const result = await sellers.postSellersInactiveNotifications(inactivity_period);

    res.status(200).json({
      message: "Notifications sent to inactive sellers",
      result,
    });
  } catch (error) {
    next(new AppError("Failed to send notifications", 500));
  }
});
