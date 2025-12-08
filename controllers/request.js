const { StatusCodes } = require("http-status-codes");
const Request = require("../models/request");
const { REQUEST_TYPE } = require("../constants/enums");

const get_requests = async (req, res) => {
  const { page, requested_by, responded_by, type } = req.query;
  const query = {};
  if (requested_by) query.requested_by = requested_by;
  if (responded_by) query.responded_by = responded_by;
  if (type) query.type = { $in: type };

  const data = Request.find(query)
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
  if (type === REQUEST_TYPE.Loan) {
    request.amount = req.body.amount;
    request.repayment_date = req.body.repayment_date;
  } else if (type === REQUEST_TYPE.Leave) {
    request.duration = req.body.duration;
    request.start_date = req.body.start_date;
  } else if (type === REQUEST_TYPE.Exception) {
    request.type = req.body.type;
    request.date = req.body.date;
    request.duration = req.body.duration;
  }

  const data = await Request.create(request);
  res.status(StatusCodes.CREATED).json({ success: true, data });
};

const respond = async (req, res) => {
  const { id } = req.params;
  const responded_by = req.user.id;
  const { respond } = req.body;
  const responded_at = new Date();
  const data = Request.findByIdAndUpdate(id, {
    responded_by,
    respond,
    responded_at,
  });
  res.status(StatusCodes.OK).json({ success: true, data });
};

module.exports = {
  get_requests,
  get_request,
  create_request,
  respond
};
