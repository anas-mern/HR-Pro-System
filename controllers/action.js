const { StatusCodes } = require("http-status-codes");
const Action = require("../models/actions");
const { NotFoundThrower } = require("../errors/not-found");

const get_actions = async (req, res) => {
  const { type, acted_by, acted_on, page } = req.query;
  const query = {};
  if (type) query.type = type;
  if (acted_by) query.acted_by = acted_by;
  if (acted_on) query.acted_on = acted_on;
  const data = await Action.find(query)
    .skip(page * 20 - 1)
    .limit(20);
  res.status(StatusCodes.OK).json({ success: true, data });
};
const get_action = async (req, res) => {
  const { id } = req.params;
  const data = await Action.findById(id);
  NotFoundThrower("Action", data);
  res.status(StatusCodes.OK).json({ success: true, data });
};
const create_action = async (req, res) => {
  const { acted_on, amount, type, reason } = req.body;
  console.log(req.user)
  const acted_by = req.user.id;
  const data = await Action.create({
    acted_on,
    amount,
    type,
    reason,
    acted_by,
  });
  res.status(StatusCodes.CREATED).json({ success: true, data });
};
const edit_action = async (req, res) => {
  const { acted_on, amount, type, reason } = req.body;
  const acted_by = req.user.id;
  const { id } = req.params;
  const new_action = {};
  if (acted_on) new_action.acted_on = acted_on;
  if (acted_by) new_action.acted_by = acted_by;
  if (amount) new_action.amount = amount;
  if (type) new_action.type = type;
  if (reason) new_action.reason = reason;
  const data = await Action.findByIdAndUpdate(id, new_action, { new: true });
  res.status(StatusCodes.OK).json({ success: true, data });
};

const delete_action = async (req, res) => {
  const { id } = req.params;
  const data = await Action.findByIdAndDelete(id);
  NotFoundThrower("Action", data);
  res.status(StatusCodes.OK).json({ success: true, data });
};

module.exports = {
  get_actions,
  get_action,
  create_action,
  edit_action,
  delete_action,
};
