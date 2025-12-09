const mongoose = require("mongoose");
const { REQUEST_TYPE, RESPOND, EXCEPTION_TYPE } = require("../constants/enums");

const RequestSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: REQUEST_TYPE,
    },
    requested_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: [true, "Please Provide The Reason"],
    },
    responded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    responded_at: {
      type: Date,
      default: null,
    },
    response: {
      type: String,
      enum: Object.values(RESPOND),
      default: null,
    },

    //Loan Fields
    amount: Number,
    repayment_date: Date,

    //Leave Fields
    leave_start_date: Date,
    leave_duration: Number,

    //Exception Fields
    exception_type: {
      type: String,
      enum: Object.values(EXCEPTION_TYPE),
    },
    exception_date: Date,
    exception_duration: {
      type: Number,
      enum: [0.25, 0.5, 0.75, 1],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("request", RequestSchema);
