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
postRouter.post("/", (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: posts.length + 1, title, content });
    return res.json({ id: posts.length + 1, title, content });
});
postRouter.put("/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    return res.json(post);
});
postRouter.delete("/:id", (req, res) => {
    return res.json(posts.filter((p) => p.id !== parseInt(req.params.id)));
});
export default postRouter;
