import Post from "../models/post";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.json(posts);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.json(post);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.json(post);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(post);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id, req.body, { new: true });
        return res.json(post);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
