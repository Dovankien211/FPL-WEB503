import Post from "../models/post.model";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.json(posts);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Không tìm thấy bài viết",
            });
        }
        return res.json(post);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.status(201).json(post);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({
                message: "Không tìm thấy bài viết",
            });
        }
        return res.json(post);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Không tìm thấy bài viết",
            });
        }
        return res.json(post);
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
};
