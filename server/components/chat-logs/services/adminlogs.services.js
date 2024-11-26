const adminlogs = require("../db/adminlogs.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.getAdminlogs = async (options) => {
  // Implement your business logic here...

  try {
    let logs = await adminlogs.getAdminlogsDb(options);
    return logs;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postAdminlogs = async (logData) => {
<<<<<<< HEAD
  try {
=======

  try {
    
>>>>>>> aecadb070dc41c418107f9a1c82ffc8061e4c8d0
    // For now, call the db function and return its result
    const result = await adminlogs.postAdminlogsDb(logData);
    return result;
  
  } catch (error) {
    throw new AppError(error);
  }
};