const mongoose = require("mongoose");
const { User } = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { NotFoundThrower } = require("../errors");
const { userFields } = require("../constants/enums");

const get_user = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  NotFoundThrower("User", user);
  const { password, ...data } = user.toObject();
  res.status(StatusCodes.OK).json({ success: true, data });
};

const get_users = async (req, res) => {
  const { page, name, nationality, position, break_time,role } = req.query;
  const query = {};
  if (name) query.name = { $regex: name.trim(), $options: "i" };
  if (nationality) query.nationality = { $in: nationality };
  if (position) query.position = { $in: position };
  if (break_time) query.break_time = { $in: break_time };
  if(role) query.role = role
  const data = await User.find(query)
    .skip((page - 1) * 20)
    .limit(20);
  res.status(StatusCodes.OK).json({ success: true, data });
};

const create_user = async (req, res) => {
  const userData = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => userFields.includes(key))
  );
  const user = await User.create(userData);
  const { password, ...data } = user.toObject();
  res.status(StatusCodes.CREATED).json({ success: true, data });
};

const edit_user = async (req, res) => {
  const { id } = req.params;
  const userData = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => userFields.includes(key))
  );
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  NotFoundThrower("User", user);
  const { password, ...data } = user.toObject();
  res.status(StatusCodes.OK).json({ success: true, data });
};

const delete_user = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  NotFoundThrower("User", user);
  const { password, ...data } = user.toObject();
  res.status(StatusCodes.OK).json({ success: true, data });
};

module.exports = {
  get_user,
  get_users,
  create_user,
  edit_user,
  delete_user,
};
