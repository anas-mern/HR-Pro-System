const express = require("express");
const {
  get_request,
  get_requests,
  create_request,
  respond,
} = require("../controllers/request");
const { authMiddleware } = require("../Middleware/auth");
const {
  requestValidate,
  requestUpdateValidate,
} = require("../Middleware/requestValidate");

const RequestRouter = express.Router();

RequestRouter.route("/")
  .get(authMiddleware(true), get_requests)
  .post(authMiddleware(false), requestValidate, create_request);
RequestRouter.route("/:id")
  .get(authMiddleware(true), get_request)
  .patch(authMiddleware(true), requestUpdateValidate, respond);
module.exports = RequestRouter;
