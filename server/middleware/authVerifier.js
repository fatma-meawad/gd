const jwt = require("jsonwebtoken");

const authVerifier = (req, res, next) => {
  const authHeader = req.headers.authorization;
};

module.exports = authVerifier;
