const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { REQUEST_TYPE, RESPOND, EXCEPTION_TYPE } = require("../constants/enums");
const { BadRequest } = require("../errors");

const requestValidator = Joi.object({
  // --------------------------
  // Base fields
  // --------------------------
  type: Joi.string()
    .valid(...Object.values(REQUEST_TYPE))
    .required(),
  requested_by: Joi.objectId().optional(),
  reason: Joi.string().required(),
  responded_by: Joi.objectId().optional(),
  responded_at: Joi.date().optional(),
  response: Joi.string()
    .valid(...Object.values(RESPOND))
    .optional(),

  // --------------------------
  // Loan fields
  // --------------------------
  amount: Joi.when("type", {
    is: REQUEST_TYPE.Loan,
    then: Joi.number().required(),
    otherwise: Joi.forbidden(),
  }),

  repayment_date: Joi.when("type", {
    is: REQUEST_TYPE.Loan,
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),

  // --------------------------
  // Leave fields
  // --------------------------
  leave_start_date: Joi.when("type", {
    is: REQUEST_TYPE.Leave,
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  leave_duration: Joi.when("type", {
    is: REQUEST_TYPE.Leave,
    then: Joi.number().required(),
    otherwise: Joi.forbidden(),
  }),

  // --------------------------
  // Exception fields
  // --------------------------
  exception_type: Joi.when("type", {
    is: REQUEST_TYPE.Exception,
    then: Joi.string()
      .valid(...Object.values(EXCEPTION_TYPE))
      .required(),
    otherwise: Joi.forbidden(),
  }),
  exception_date: Joi.when("type", {
    is: REQUEST_TYPE.Exception,
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  exception_duration: Joi.when("type", {
    is: REQUEST_TYPE.Exception,
    then: Joi.number().valid(0.25, 0.5, 0.75, 1).required(),
    otherwise: Joi.forbidden(),
  }),
});

const requestUpdateValidator = requestValidator.fork(
  Object.keys(requestValidator.describe().keys),
  (schema) => schema.optional()
);

const requestValidate = (req, res, next) => {
  const { error } = requestValidator.validate(req.body);
  if (error) throw new BadRequest(error.details[0].message);
  next();
};

const requestUpdateValidate = (req, res, next) => {
  const { error } = requestUpdateValidator.validate(req.body);
  if (error) throw new BadRequest(error.details[0].message);
  next();
};

module.exports = { requestValidate, requestUpdateValidate };
