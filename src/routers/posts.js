import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post";

const routePosts = express.Router();

routePosts.get("/", getAllPosts);
routePosts.get("/:id", getPostById);
routePosts.post("/", createPost);
routePosts.put("/:id", updatePost);
routePosts.delete("/:id", deletePost);

export default routePosts;
