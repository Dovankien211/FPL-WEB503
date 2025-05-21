import { Router } from "express";
import { getAllPosts } from "../controllers/post";

const routePost = Router();
// Datafake
let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];
// api/posts
routePost.get("/", getAllPosts);

// api/posts/:id
routePost.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id === +req.params.id);
    if (!post)
        return res.status(404).json({
            message: "Không có bài viết nào phù hợp",
        });
    return res.json(post);
});
routePost.post("/", (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: Date.now(), title: title, content: content };
    posts.push(newPost);
    return res.status(201).json(newPost);
});

routePost.put("/:id", (req, res) => {
    const post = posts.find((p) => p.id === +req.params.id);
    if (!post)
        return res.status(404).json({
            message: "Không có bài viết nào phù hợp",
        });
    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;

    return res.json(post);
});

routePost.delete("/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Post not found" });

    posts.splice(index, 1);
    res.json({ success: true });
});
export default routePost;
