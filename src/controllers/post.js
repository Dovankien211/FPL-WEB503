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
export const getPostById = async (req, res) => {};
export const createPost = async (req, res) => {};
export const updatePost = async (req, res) => {};
export const deletePost = async (req, res) => {};
