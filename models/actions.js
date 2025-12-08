const mongoose = require("mongoose");
const { EDIT_TYPE } = require("../constants/enums");

const ActionSchema = mongoose.Schema(
  {
    edited_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide The Admin Id"],
    },
    type: {
      type: String,
      required: [true, "Please Provide The Edit Type"],
      enum: Object.values(EDIT_TYPE)
    },
    amount: {
      type: Number,
      required: [true, "Please Provide The Amount"],
    },
    edited_on: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide The Employee Id"],
    },
    reason: {
      type: String,
      required: [true, "Please Provide The Reason"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("action", ActionSchema);

module.exports = User;
