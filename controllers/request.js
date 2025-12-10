const { StatusCodes } = require("http-status-codes");
const Request = require("../models/request");
const { REQUEST_TYPE } = require("../constants/enums");
const { default: mongoose } = require("mongoose");
const { BadRequest } = require("../errors");
const { push_notification } = require("../constants/notification");

const get_requests = async (req, res) => {
  const { page, requested_by, responded_by, responded, response, type } =
    req.query;
  const query = {};
  if (requested_by)
    query.requested_by = new mongoose.Types.ObjectId(requested_by);
  if (responded_by)
    query.responded_by = new mongoose.Types.ObjectId(responded_by);
  if (type) query.type = { $in: type };
  if (response) query.response = response;
  if (responded === false) query.response = null;
  const data = await Request.find(query)
    .skip((page - 1) * 20)
    .limit(20);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const get_request = async (req, res) => {
  const { id } = req.params;
  const data = await Request.findById(id);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const create_request = async (req, res) => {
  let request = {};
  request.type = req.body.type;
  request.reason = req.body.reason;
  request.requested_by = req.user.id;
  if (request.type === REQUEST_TYPE.Loan) {
    request.amount = req.body.amount;
    request.repayment_date = req.body.repayment_date;
  } else if (request.type === REQUEST_TYPE.Leave) {
    request.duration = req.body.duration;
    request.start_date = req.body.start_date;
  } else if (request.type === REQUEST_TYPE.Exception) {
    request.type = req.body.type;
    request.date = req.body.date;
    request.duration = req.body.duration;
  }
  const { username } = req.user;
  const title = `${username} requested a ${type} request`;
  const body = `Reason: ${req.body.reason}`;
  const admins = await User.find({ role: ROLE.Admin }).select("fcm");
  const batchSize = 100;
  for (let i = 0; i < admins.length; i += batchSize) {
    const batch = admins.slice(i, i + batchSize);
    await Promise.all(
      batch.map((a) => push_notification(title, body, (fcm = a.fcm)))
    );
  }

  const data = await Request.create(request);
  res.status(StatusCodes.CREATED).json({ success: true, data });
};

const respond = async (req, res) => {
  const { id } = req.params;
  const responded_by = req.user.id;
  const responder = req.user.username;
  const { response } = req.body;
  const responded_at = new Date();
  const request = await Request.findById(id);
  const user = await User.findById(request.requested_by);
  const fcm = user?.fcm;
  if (!fcm) throw new Error("FCM token not found for user");
  console.log(fcm);
  const type = request.type;
  if (request.response !== null)
    throw new BadRequest("You Can't Respond On This Request");
  const title = `Your ${type} request is ${response.toUpperCase()}ED`;
  const body = `${responder} has ${response}ed your request at ${responded_at}`;
  push_notification(title, body, fcm);
  const data = await Request.findByIdAndUpdate(
    id,
    {
      responded_by,
      response,
      responded_at,
    },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ success: true, data });
};

module.exports = {
  get_requests,
  get_request,
  create_request,
  respond,
};
