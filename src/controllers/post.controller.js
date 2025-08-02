import Post from "../models/post.model";
import Joi from "joi";

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({
            error: "Lỗi",
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                error: "Không tìm thấy bài viết",
            });
        }
        return res.json(post);
    } catch (error) {
        return res.status(500).json({
            error: "Lỗi",
        });
    }
};
export const createPost = async (req, res) => {
    try {
        const { error } = postSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(500).json({ errors: error.details.map((err) => err.message) });
        } else {
            const post = await Post.create(req.body);
            return res.json(post);
        }
    } catch (error) {
        return res.status(500).json({
            error: "Lỗi",
        });
    }
};
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(post);
    } catch (error) {
        return res.status(500).json({
            error: "Lỗi",
        });
    }
};
export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa bài viết thành công",
        });
    } catch (error) {
        return res.status(500).json({
            error: "Lỗi",
        });
    }
};
