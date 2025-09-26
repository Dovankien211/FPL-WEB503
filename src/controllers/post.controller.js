import Post from "../models/post.model";
import Joi from "joi";
const postSchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    content: Joi.string().required(),
});
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { error } = postSchema.validate({ title, content }, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                errors: error.details.map((error) => error.message),
            });
        }
        const post = await Post.create({ title, content });
        return res.status(201).json(post);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const updatePost = async (req, res) => {
    try {
        const { error } = postSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                errors: error.details.map((error) => error.message),
            });
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
