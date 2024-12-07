const admins = require("../db/admins.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

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
    const result = await admins.postAdminsRegisterDb(admin);
    return {
      data: result.data,
      messages: ["Registration successful"],
      locations: ["admins.service.js"]
    };
  } catch (error) {
    if (error.message === "Email already registered") {
      const appError = new AppError({
        errors: [error.message],
        locations: ["admins.service.js"]
      });
      appError.statusCode = 409;
      throw appError;
    }
    if (error.message === "Invalid or expired registration code") {
      const appError = new AppError({
        errors: [error.message],
        locations: ["admins.service.js"]
      });
      appError.statusCode = 400;
      throw appError;
    }
    const appError = new AppError({
      errors: [error.message || "Internal server error"],
      locations: ["admins.service.js"]
    });
    appError.statusCode = 500;
    throw appError;
  }
};