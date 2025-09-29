import Joi from "joi";

export const postSchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    content: Joi.string().required(),
});
