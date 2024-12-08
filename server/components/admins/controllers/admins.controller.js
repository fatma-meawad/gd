const asyncHandler = require("express-async-handler");
const admins = require("../services/admins.services");
const AppError = require("../../../utils/error");

exports.postAdminsLogin = asyncHandler(async (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  /** request:
      1- Validate email and password fields.
      2- Ensure they match the OpenAPI contract.
  */

  /** response:
      1- If successful, send back the proper status and response schema.
      2- Handle cases like blocked accounts or invalid credentials appropriately.
  */
  let result = await admins.postAdminsLogin(credentials);

  // Temporary response
  result.messages.push("loginAdmin controller not implemented yet");
  result.locations.push("admins.controller.js");
  res.status(200).send(result);
});

exports.putAdminsByIdDeactivate = asyncHandler(async (req, res) => {
  const options = {
    id: req.params["id"],
    body: req.body,
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await admins.putAdminsByIdDeactivate(...Object.values(options));

  // Temporary response
  result.messages.push(
    "putAdminsByIdDeactivate controller not implemented yet"
  );
  result.locations.push("admins.controller.js");
  res.status(200).send(result);
});

exports.putAdminsByIdProfile = asyncHandler(async (req, res) => {
  const options = {
    id: req.params["id"],
    body: req.body,
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await admins.putAdminsByIdProfile(...Object.values(options));

  // Temporary response
  result.messages.push("putAdminsByIdProfile controller not implemented yet");
  result.locations.push("admins.controller.js");
  res.status(200).send(result);
});

exports.getAdmins = asyncHandler(async (req, res) => {
  const options = {
    page: req.query["page"],
    limit: req.query["limit"],
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await admins.getAdmins(...Object.values(options));

  // Temporary response
  result.messages.push("getAdmins controller not implemented yet");
  result.locations.push("admins.controller.js");
  res.status(200).send(result);
});

exports.postAdminsStatusNotifications = asyncHandler(async (req, res) => {
  const options = {
    body: req.body,
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await admins.postAdminsStatusNotifications(
    ...Object.values(options)
  );

  // Temporary response
  result.messages.push(
    "postAdminsStatusNotifications controller not implemented yet"
  );
  result.locations.push("admins.controller.js");
  res.status(200).send(result);
});

exports.getAdminsPasswordReset = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      status: "error",
      errors: [
        "Token is required.",
        "Empty value found for query parameter 'token'",
      ],
    });
  }
  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await admins.getAdminsPasswordReset(token);

  // Temporary response
  result.messages.push("getAdminsPasswordReset controller not implemented yet");
  result.locations.push("admins.controller.js");
  res.status(200).send(result);
});

exports.putAdminsPasswordReset = asyncHandler(async (req, res) => {
  const options = {
    body: req.body,
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await admins.putAdminsPasswordReset(...Object.values(options));

  // Temporary response
  result.messages.push("putAdminsPasswordReset controller not implemented yet");
  result.locations.push("admins.controller.js");
  res.status(200).send(result);
});

exports.postAdminsPasswordReset = asyncHandler(async (req, res) => {
  const options = {
    body: req.body,
  };

  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await admins.postAdminsPasswordReset(...Object.values(options));

  // Temporary response
  result.messages.push(
    "postAdminsPasswordReset controller not implemented yet"
  );
  result.locations.push("admins.controller.js");
  res.status(200).send(result);
});

exports.postAdminsRegister = asyncHandler(async (req, res) => {
  const admin = {
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone,
    activation_code: req.body.activation_code,
    password: req.body.password,
    address: req.body.address,
    profile_photo: req.body.profile_photo,
    bio: req.body.bio,
  };
  /**  request:
      1- check if the parameters extracted from req are correct. The params, the query and the body.
      2- the openapi validator should match the types with the contract, so make sure they match
      3- Modify the data being sent to services (object.values(options)) and don't send all options if not needed.
  */

  /**  response:
      1- the default success status is 200, if you have something else planned, use it to match the validator
      2- use the response schema if any.
  */
  let result = await admins.postAdminsRegister(admin);

  // Temporary response
  result.messages.push("postAdminsRegister controller not implemented yet");
  result.locations.push("admins.controller.js");
  res.status(201).send(result);
});
