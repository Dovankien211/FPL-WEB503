import express from "express";
import { createPost, getAllPosts, getPostById } from "../controllers/post";

const routePosts = express.Router();

routePosts.get("/", getAllPosts);
routePosts.get("/:id", getPostById);
routePosts.post("/", createPost);
routePosts.put("/", () => {
    console.log("Cập nhật bài viết");
});
routePosts.delete("/:id", (req, res) => {});

export default routePosts;
