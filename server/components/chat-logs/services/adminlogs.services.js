const adminlogsDb = require("../db/adminlogs.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.getAdminlogs = async (options) => {
  try {
    const logs = await adminlogsDb.getAdminlogsDb(options);
    return logs;
  } catch (error) {
    throw new AppError(error);
  }
};
