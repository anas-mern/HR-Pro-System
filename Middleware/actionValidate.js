const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { BadRequest } = require("../errors");
const { ACTION_TYPE } = require("../constants/enums");

const actionValidator = Joi.object({
  acted_by: Joi.objectId().optional(),
  type: Joi.string()
    .valid(...Object.values(ACTION_TYPE))
    .required(),
  reason: Joi.string().required(),
  acted_on: Joi.objectId().required(),
  amount: Joi.number().required(),
});

const actionUpdateValidator = actionValidator.fork(
  Object.keys(actionValidator.describe().keys),
  (schema) => schema.optional()
);

const actionValidate = (req, res, next) => {
  const { error } = actionValidator.validate(req.body);
  if (error) throw new BadRequest(error.details[0].message);
  next();
};

const actionUpdateValidate = (req, res, next) => {
  const { error } = actionUpdateValidator.validate(req.body);
  if (error) throw new BadRequest(error.details[0].message);
  next();
};

module.exports = { actionValidate, actionUpdateValidate };
