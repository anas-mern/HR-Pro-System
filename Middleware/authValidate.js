const joi = require("joi");
const { BadRequest } = require("../errors");

const loginValidate = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    fcm: joi.string().required(),
    password: joi.string().min(6).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  next();
};

module.exports = {
  loginValidate,
};
