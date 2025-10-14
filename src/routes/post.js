import express from "express";
import Post from "../models/post.js";
const router = express.Router();

router.get("/", async (req, res) => {
    const limit = parseInt(req.query._limit) || 0;
    const sortField = req.query._sort|| "createdAt";
    const sortOrder = req.query._order === "desc" ? -1 : 1;
    const post = await Post.find()
    .sort({[sortField]: sortOrder})
    .limit(limit);
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
