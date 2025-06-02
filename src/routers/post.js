import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post";
const routePost = express.Router();

routePost.get("/", getAllPosts);
routePost.get("/:id", getPostById);
routePost.post("/", createPost);
routePost.put("/:id", updatePost);
routePost.delete("/:id", deletePost);
export default routePost;
