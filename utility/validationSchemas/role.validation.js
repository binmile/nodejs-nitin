import Joi from "joi";


export const RoleValidator = Joi.object().keys({
    role_name:Joi.string().valid("student","teacher").required(),
    description:Joi.string().required()
})

export const updateRoleValidator = Joi.object().keys({
    role_name:Joi.string().valid("student","teacher"),
    description:Joi.string()
})

export const updateRoleParamsValidator = Joi.object().keys({
    id:Joi.number().required()
})