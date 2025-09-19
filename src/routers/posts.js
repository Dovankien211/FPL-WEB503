import { Router } from "express";

const postRouter = Router();
const posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];
// Lấy danh sách
postRouter.get("/", (req, res) => {
    res.json(posts);
});

// Lấy chi tiết bài viết
postRouter.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });
    return res.json(post);
});
// Thêm bài viết
postRouter.post("/", (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: Date.now(), title, content };
    posts.push(newPost);
    return res.status(201).json(newPost);
});
// Cập nhật
postRouter.put("/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;

    return res.json(post);
});
// Xóa bài viết
postRouter.delete("/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Post not found" });

    posts.splice(index, 1);
    return res.json({ success: true });
});

export default postRouter;
