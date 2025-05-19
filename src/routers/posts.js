import { Router } from "express";

const routePost = Router();
// Datafake
let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

// trả về danh sách bài viết
routePost.get("/", (req, res) => {
    console.log(1);
    return res.json(posts);
});

routePost.get("/:id", (req, res) => {
    const post = posts.find((p) => {
        return p.id === +req.params.id;
    });
    if (!post)
        return res.status(404).json({
            message: "Không có bài viết nào",
        });
    return res.status(200).json(post);
});

// Thêm mới
routePost.post("/", (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: Date.now(), title, content };
    posts.push(newPost);
    return res.status(201).json(posts);
});
export default routePost;
