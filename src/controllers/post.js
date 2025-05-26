import Post from "../models/post";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        if (posts.length == 0)
            return res.status(200).json({
                message: "Không có bài viết nào",
            });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
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
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(post);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
