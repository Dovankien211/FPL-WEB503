import { Router } from "express";
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost,
} from "../controllers/post.controller";
import validateRequest from "../middlewares/validateRequest";
import { postSchema } from "../validation/post.validation";
import { restrictTo, verifyJWT } from "../middlewares/auth.middleware";
const postRouter = Router();

// Lấy danh sách
postRouter.get("/", getPosts);
// Lấy chi tiết bài viết
postRouter.get("/:id", getPostById);

postRouter.use(verifyJWT);

postRouter.use(restrictTo("admin", "staff"));
// Thêm bài viết
postRouter.post("/", validateRequest(postSchema), createPost);
// Cập nhật
postRouter.put("/:id", validateRequest(postSchema), updatePost);
// Xóa bài viết
postRouter.delete("/:id", deletePost);

export default postRouter;
