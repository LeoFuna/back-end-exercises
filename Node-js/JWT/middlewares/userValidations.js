const Joi = require('joi');

const userValidation = (req, _res, next) => {
  const { username, password } = req.body;
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(5).alphanum().required(),
  });
  const { error } = schema.validate({ username, password });
  if(error) return next(error);
  
  next();
};

module.exports = { userValidation };