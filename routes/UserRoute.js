const express = require("express");
const {
  get_user,
  get_users,
  create_user,
  edit_user,
  delete_user,
} = require("../controllers/user");
const { authMiddleware } = require("../Middleware/auth");
const { userValidate } = require("../Middleware/userValidate");

const UserRouter = express.Router();

// UserRouter.use(authMiddleware(true));
UserRouter.route("/").get(get_users).post(userValidate, create_user);
UserRouter.route("/:id")
  .get(get_user)
  .patch(userValidate, edit_user)
  .delete(delete_user);
module.exports = UserRouter;
