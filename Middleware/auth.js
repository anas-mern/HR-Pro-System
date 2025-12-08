const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");
require("dotenv").config();

const authMiddleware = (admin) => {
  return (req, res, next) => {
    const { headers } = req;
    if (
      !headers.authorization ||
      !headers.authorization.startsWith("Bearer ")
    ) {
      throw new Unauthenticated("Authentication Invalid");
    }
    const token = headers.authorization.split(" ")[1];

    const { role, userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: userId,
      role,
    };
    if (admin && role !== 1) {
      throw new Unauthenticated("You Are Not Allowed To Do This Operation");
    }
    next();
  };
};

module.exports = { authMiddleware };
