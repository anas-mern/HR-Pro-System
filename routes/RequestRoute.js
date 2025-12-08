const express = require("express");
const {
  get_request,
  get_requests,
  create_request,
  respond,
} = require("../controllers/request");
const { authMiddleware } = require("../Middleware/auth");
const { requestValidate } = require("../Middleware/requestValidate");

const RequestRouter = express.Router();

RequestRouter.use(authMiddleware(true));
RequestRouter.route("/")
  .get(get_requests)
  .post(requestValidate, create_request);
RequestRouter.route("/:id").get(get_request).patch(requestValidate, respond);
module.exports = RequestRouter;
