const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { GENDER, ROLE } = require("../constants/enums");
require("dotenv").config();
const UserSchema = mongoose.Schema(
  {
    fcm: {
      type: String,
      required: [true, "Please Provide A FCM"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Please Provide A UserName"],
      unique: true,
    },
    about_me: {
      type: String,
      required: [true, "Please Provide An Address"],
    },
    image: {
      type: String,
      required: [true, "Please Provide An Image"],
    },
    email: {
      type: String,
      required: [true, "Please Provide An Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide A Password"],
    },
    salary: {
      type: Number,
      required: [true, "Please Provide A Salary"],
    },
    KPIs: {
      type: Number,
      required: [true, "Please Provide KPIs"],
    },
    address: {
      type: String,
      required: [true, "Please Provide An Address"],
    },
    gender: {
      type: String,
      enum: Object.values(GENDER),
      required: [true, "Please Provide A Gender"],
    },
    nationality: {
      type: String,
      required: [true, "Please Provide A Nationality"],
    },
    nationId: {
      type: String,
      required: [true, "Please Provide A Nation ID"],
    },
    age: {
      type: Number,
      required: [true, "Please Provide An Age"],
    },
    position: {
      type: String,
      required: [true, "Please Provide A Position"],
    },
    role: {
      type: Number,
      required: [true, "Please Provide A Role"],
      enum: Object.values(ROLE),
    },
    leave_days: {
      type: Number,
      default: 21,
    },
    phone_num: {
      type: String,
      required: [true, "Please Provide A Phone Num"],
    },
    join_date: {
      type: Date,
      required: [true, "Please Provide A Join Date"],
    },
    break_time: {
      type: String,
      required: [true, "Please Provide The Break Time"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  console.log(process.env.JWT_SECRET);
  console.log(process.env.JWT_LIFETIME);
  return jwt.sign(
    { userId: this._id, username: this.username, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

const User = mongoose.model("user", UserSchema);

module.exports = { User };
