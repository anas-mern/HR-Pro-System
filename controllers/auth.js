const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/user");
const { BadRequest } = require("../errors");
const bcrypt = require("bcryptjs");
const { NotFoundThrower } = require("../errors");
const { userFields } = require("../constants/enums");
require("dotenv").config();

const sendSuccess = (res, data, status = StatusCodes.OK) =>
  res.status(status).json({ success: true, ...data });

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  NotFoundThrower("Email", user);
  console.log(user);
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new BadRequest("Password Is Wrong");
  }
  const token = user.createJWT();
  const { role: rl, password: pw, ...data } = user.toObject();
  sendSuccess(res, { data, token }, StatusCodes.OK);
};

const me = async (req, res) => {
  const user = await User.findById(req.user.id);
  NotFoundThrower("User", user);
  const { password, ...data } = user.toObject();
  res.status(200).json({ data });
};

const editme = async (req, res) => {
  const user = await User.findById(req.user.id);
  const userData = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => userFields.includes(key))
  );
  const { old_password } = req.body;
  console.log(old_password);
  console.log(user);
  const comparePassword = await bcrypt.compare(old_password, user.password);
  if (!comparePassword) {
    throw new BadRequest("Old Password Is Wrong");
  }
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
  }
  const newdata = await User.findByIdAndUpdate(req.user.id, userData, {
    new: true,
  });
  const { password, ...data } = newdata._doc;
  res.status(StatusCodes.OK).json({ success: true, data });
};

module.exports = {
  login,
  me,
  editme,
};
