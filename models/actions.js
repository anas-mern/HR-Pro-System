const mongoose = require("mongoose");
const { Action_TYPE } = require("../constants/enums");

const ActionSchema = mongoose.Schema(
  {
    acted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide The Admin Id"],
    },
    type: {
      type: String,
      required: [true, "Please Provide The Edit Type"],
      enum: Object.values(Action_TYPE)
    },
    amount: {
      type: Number,
      required: [true, "Please Provide The Amount"],
    },
    acted_on: {
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

const Action = mongoose.model("action", ActionSchema);

module.exports = Action;
