const express = require("express");
const { login, me, editme } = require("../controllers/auth");
const { loginValidate } = require("../Middleware/authValidate");
const { authMiddleware } = require("../Middleware/auth");
const AuthRouter = express.Router();

AuthRouter.route("/login").post(loginValidate, login);
AuthRouter.route("/myaccount")
  .get(authMiddleware(false), me)
  .patch(authMiddleware(false), editme);
module.exports = AuthRouter;

