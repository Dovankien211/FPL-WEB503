import { Router } from "express";
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost,
} from "../controllers/post.controller";

const postRouter = Router();

// Lấy danh sách
postRouter.get("/", getPosts);
// Lấy chi tiết bài viết
postRouter.get("/:id", getPostById);
// Thêm bài viết
postRouter.post("/", createPost);
// Cập nhật
postRouter.put("/:id", updatePost);
// Xóa bài viết
postRouter.delete("/:id", deletePost);

export default postRouter;
