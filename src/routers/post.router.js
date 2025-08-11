import { Router } from "express";
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost,
} from "../controllers/post.controller";

const postRouter = Router();

// GET api/posts
postRouter.get("/", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", createPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
export default postRouter;
