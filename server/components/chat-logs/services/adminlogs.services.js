const adminlogs = require("../db/adminlogs.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.getAdminlogs = async (
  admin_id,
  keyword,
  date_range,
  sort_by,
  order
) => {
  // Implement your business logic here...

  try {
    let result = await adminlogs.getAdminlogsDb(
      admin_id,
      keyword,
      date_range,
      sort_by,
      order
    );
    //delete this when you actually implement something.
    result.messages.push("getAdminlogs services not implemented yet");
    result.locations.push("adminlogs.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postAdminlogs = async () => {
  // Implement your business logic here...

  try {
    let result = await adminlogs.postAdminlogsDb();
    //delete this when you actually implement something.
    result.messages.push("postAdminlogs services not implemented yet");
    result.locations.push("adminlogs.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
