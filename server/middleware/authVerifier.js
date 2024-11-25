const jwt = require("jsonwebtoken");

const authVerifier = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) return true;
  return false;
};

module.exports = authVerifier;
