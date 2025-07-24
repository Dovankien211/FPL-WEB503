import { Router } from "express";

const postRouter = Router();

let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" }, // p
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" }, // p
];

// api/posts
postRouter.get("/", (req, res) => {
    return res.json(posts);
});

postRouter.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    return res.json(post);
});
export default postRouter;
