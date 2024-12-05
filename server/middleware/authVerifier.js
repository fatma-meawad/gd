const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error");

const authVerifier = (req, res, next) => {
  if (req.headers.auth) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send({
      status: "fail",
      statusCode: StatusCodes.UNAUTHORIZED,
      messages: "Authorization header is missing or invalid",
      errors: [
         "Authorization header is missing or invalid"
      ],
      locations: ["authVerifier"],
    });

  }
  
};

module.exports = authVerifier;
