const admins = require("../db/admins.db");
const path = require("path");
const bcrypt = require('bcrypt');
const AppError = require(path.join(__dirname, "../../../utils/error"));

const HTTP_STATUS_CONFLICT = 409;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
const SALT_ROUNDS = 10;
const LOCATION = 'admins.service.js';

module.exports.postAdminsLogin = async (credentials) => {
  // Implement your business logic here...

  try {
    let result = await admins.postAdminsLoginDb(credentials);

    // Temporary response
    result.messages.push("loginAdmin service not implemented yet");
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    // Customize error handling logic for invalid credentials or blocked accounts.
    throw new AppError(error);
  }
};

module.exports.putAdminsByIdDeactivate = async (id) => {
  // Implement your business logic here...

  try {
    let result = await admins.putAdminsByIdDeactivateDb(id);
    //delete this when you actually implement something.
    result.messages.push(
      "putAdminsByIdDeactivate services not implemented yet"
    );
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.putAdminsByIdProfile = async (id) => {
  // Implement your business logic here...

  try {
    let result = await admins.putAdminsByIdProfileDb(id);
    //delete this when you actually implement something.
    result.messages.push("putAdminsByIdProfile services not implemented yet");
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getAdmins = async (page, limit) => {
  // Implement your business logic here...

  try {
    let result = await admins.getAdminsDb(page, limit);
    //delete this when you actually implement something.
    result.messages.push("getAdmins services not implemented yet");
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postAdminsStatusNotifications = async () => {
  // Implement your business logic here...

  try {
    let result = await admins.postAdminsStatusNotificationsDb();
    //delete this when you actually implement something.
    result.messages.push(
      "postAdminsStatusNotifications services not implemented yet"
    );
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getAdminsPasswordReset = async (token) => {
  // Implement your business logic here...

  try {
    let result = await admins.getAdminsPasswordResetDb(token);
    //delete this when you actually implement something.
    result.messages.push("getAdminsPasswordReset services not implemented yet");
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.putAdminsPasswordReset = async (adminId, newPassword) => {
  // Implement your business logic here...

  try {
    let result = await admins.putAdminsPasswordResetDb(adminId, newPassword);
    //delete this when you actually implement something.
    result.messages.push("putAdminsPasswordReset services not implemented yet");
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};


module.exports.postAdminsRegister = async (admin) => {
  try {
    const password_hash = await bcrypt.hash(admin.password, SALT_ROUNDS);

    const adminToCreate = {
      ...admin,
      password_hash
    };

    const result = await admins.postAdminsRegisterDb(adminToCreate);
    
    return {
      data: result.data,
      messages: result.messages,
      locations: [...result.locations, LOCATION]
    };

  } catch (error) {
    if (error.message === "Email already registered") {
      const appError = new AppError({
        errors: [error.message],
        locations: [LOCATION]
      });
      appError.statusCode = HTTP_STATUS_CONFLICT;
      throw appError;
    }
    if (error.message === "Invalid or expired registration code") {
      const appError = new AppError({
        errors: [error.message],
        locations: [LOCATION]
      });
      appError.statusCode = HTTP_STATUS_BAD_REQUEST;
      throw appError;
    }
    const appError = new AppError({
      errors: [error.message || "Internal server error"],
      locations: [LOCATION]
    });
    appError.statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR;
    throw appError;
  }
};