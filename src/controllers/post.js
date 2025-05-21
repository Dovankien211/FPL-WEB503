import Post from "../models/post";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        if (posts.length === 0)
            return res.json({
                message: "Không có bài viết nào!",
            });
        return res.json(posts);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.json({ message: "Không có bài viết nào!" });
        return res.json(post);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({ title, content });
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const updatePost = async (req, res) => {};
export const deletePost = async (req, res) => {};
