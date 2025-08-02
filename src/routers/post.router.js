import express from "express";
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost,
} from "../controllers/post.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { postSchema } from "../validation/post.validation";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", validateRequest(postSchema), createPost);
postRouter.put("/:id", validateRequest(postSchema), updatePost);
postRouter.delete("/:id", deletePost);
export default postRouter;
