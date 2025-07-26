import express from "express";
import { createPost, getPosts } from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.post("/", createPost);
export default postRouter;
