import Joi from "joi";

export const createUserValidator = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(20).required(),
  lastName: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().alphanum().min(8).required(),
  age: Joi.number().min(18).max(70).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .regex(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    )
    .messages({ "message": `wrong format` })
    .required(),
  gender: Joi.string().valid("male","female").required(),
});

export const updateUserValidator = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(20),
  lastName: Joi.string().alphanum().min(3).max(20),
  password: Joi.string().alphanum().min(8),
  age: Joi.number().min(18).max(70),
  email: Joi.string().email(),
  phoneNo: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` }),
});

export const signInUserValidator = Joi.object().keys({
   email:Joi.string().email().required(),
   password:Joi.string().required()
})
