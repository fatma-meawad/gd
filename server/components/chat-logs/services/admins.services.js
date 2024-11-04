const admins = require("../db/admins.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.postAdminsByIdStatus = async (id) => {
  // Implement your business logic here...

  try {
    let result = await admins.postAdminsByIdStatusDb(id);
    //delete this when you actually implement something.
    result.messages.push("postAdminsByIdStatus services not implemented yet");
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
