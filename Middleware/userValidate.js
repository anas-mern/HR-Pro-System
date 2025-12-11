const Joi = require("joi");
const { GENDER, ROLE } = require("../constants/enums");
const { BadRequest } = require("../errors");

Joi.objectId = require("joi-objectid")(Joi);

const userValidator = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  image: Joi.string().required(),
  about_me: Joi.string().min(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  salary: Joi.number().min(0).required(),
  KPIs: Joi.number().min(0).required(),
  address: Joi.string().min(5).required(),
  gender: Joi.string()
    .valid(...Object.values(GENDER))
    .required(),
  nationality: Joi.string().min(2).required(),
  nationId: Joi.string().required(),
  age: Joi.number().min(18).required(),
  position: Joi.string().min(2).required(),
  role: Joi.number()
    .valid(...Object.values(ROLE))
    .required(),
  leave_days: Joi.number().min(0).optional().default(26),
  phone_num: Joi.string().required(),
  join_date: Joi.date().required(),
  break_time: Joi.string().required(),
});

const userUpdateValidator = userValidator.fork(
  Object.keys(userValidator.describe().keys),
  (schema) => schema.optional()
);

const userValidate = (req, res, next) => {
  const { error } = userValidator.validate(req.body);
  if (error) throw new BadRequest(error.details[0].message);
  next();
};

const userUpdateValidate = (req, res, next) => {
  const { error } = userUpdateValidator.validate(req.body);
  if (error) throw new BadRequest(error.details[0].message);
  next();
};

module.exports = { userValidate, userUpdateValidate };
