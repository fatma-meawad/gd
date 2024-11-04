const admin = require("../db/admin.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.getAdminLogs = async (page, limit, startDate, endDate, user) => {
  // Implement your business logic here...

  try {
    let result = await admin.getAdminLogsDb(
      page,
      limit,
      startDate,
      endDate,
      user
    );
    //delete this when you actually implement something.
    result.messages.push("getAdminLogs services not implemented yet");
    result.locations.push("admin.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getAdminExport = async (format) => {
  // Implement your business logic here...

  try {
    let result = await admin.getAdminExportDb(format);
    //delete this when you actually implement something.
    result.messages.push("getAdminExport services not implemented yet");
    result.locations.push("admin.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.putAdminImport = async () => {
  // Implement your business logic here...

  try {
    let result = await admin.putAdminImportDb();
    //delete this when you actually implement something.
    result.messages.push("putAdminImport services not implemented yet");
    result.locations.push("admin.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
