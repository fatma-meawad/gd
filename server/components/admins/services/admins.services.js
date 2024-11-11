const admins = require("../db/admins.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));

module.exports.postAdminsLogin = async () => {
  // Implement your business logic here...

  try {
    let result = await admins.postAdminsLoginDb();
    //delete this when you actually implement something.
    result.messages.push("postAdminsLogin services not implemented yet");
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
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

module.exports.postAdminsPasswordReset = async (email) => {
  // Implement your business logic here...

  try {
    let result = await admins.postAdminsPasswordResetDb(email);
    //delete this when you actually implement something.
    result.messages.push(
      "postAdminsPasswordReset services not implemented yet"
    );
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postAdminsRegister = async () => {
  // Implement your business logic here...

  try {
    let result = await admins.postAdminsRegisterDb();
    //delete this when you actually implement something.
    result.messages.push("postAdminsRegister services not implemented yet");
    result.locations.push("admins.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};
