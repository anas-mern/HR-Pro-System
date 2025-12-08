const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/user");
const { BadRequest } = require("../errors");
const bcrypt = require("bcryptjs");
const { NotFoundThrower } = require("../errors");
require("dotenv").config();

const sendSuccess = (res, data, status = StatusCodes.OK) =>
  res.status(status).json({ success: true, ...data });

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });
  NotFoundThrower("Email", user);
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new BadRequest("Password Is Wrong");
  }
  const token = user.createJWT();
  const { role: rl, password: pw, ...data } = user.toObject();
  sendSuccess(res, { data, token }, StatusCodes.OK);
};

const me = async (req, res) => {
  const user = User.findById(req.user.id);
  NotFoundThrower("User", user);
  const { password, ...data } = user.toObject();
  res.status(200).json({ data });
};

const editme = async (req, res) => {
  const userData = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => userFields.includes(key))
  );
  const data = User.findByIdAndUpdate(req.user.id, userData, { new: true });
  res.status(StatusCodes.OK).json({ success: true, data });
};

module.exports = {
  login,
  me,
  editme,
};
