import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post";
import { restrictTo, verifyJWT } from "../middlewares/authMiddleware";
const routePost = express.Router();

routePost.get("/", getAllPosts);
routePost.get("/:id", getPostById);

// verify jwt
// routePost.use(verifyJWT);

routePost.post("/", verifyJWT, restrictTo("admin"), createPost);
routePost.put("/:id", updatePost);
routePost.delete("/:id", deletePost);
export default routePost;
