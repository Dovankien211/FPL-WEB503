import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
export const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
