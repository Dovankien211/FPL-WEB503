import Post from "../models/post.model";

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

const getPostById = async (req, res) => {
    try {
    } catch (error) {}
};
export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.json(post);
    } catch (error) {
        return res.status(500).json({
            error: "Lỗi",
        });
    }
};
const updatePost = async (req, res) => {
    try {
    } catch (error) {}
};
const deletePost = async (req, res) => {
    try {
    } catch (error) {}
};
