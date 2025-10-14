import express from "express";
import Post from "../models/post.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const post = await Post.find();
    res.json(post);

});
router.post("/", async (req, res) => {
    const post = await Post.create(req.body);
    res.json(post);

});
router.get("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);

});
router.put("/:id", async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id , req.body, {new: true});
    res.json(post);

});
router.delete("/:id", async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id );
    res.json({message: "Post deleted"});

});
export default router;
