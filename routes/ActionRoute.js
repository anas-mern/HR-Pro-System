const express = require("express");
const { authMiddleware } = require("../Middleware/auth");
const { get_actions, create_action, edit_action, get_action, delete_action } = require("../controllers/action");
const { actionUpdateValidate, actionValidate } = require("../Middleware/actionValidate");
const ActionRouter = express.Router();

ActionRouter.use(authMiddleware(true));
ActionRouter.route("/").get(get_actions).post(actionValidate, create_action);
ActionRouter.route("/:id")
  .get(get_action)
  .patch(actionUpdateValidate, edit_action)
  .delete(delete_action);
module.exports = ActionRouter;

