import { Router } from "express";

let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];

const postRouter = Router();

// GET api/posts
postRouter.get("/", (req, res) => {
    return res.json(posts);
});
postRouter.get("/:id", (req, res) => {
    const post = posts.find((item) => item.id == Number(req.params.id));
    if (!post) {
        return res.status(404).json({
            message: "Không tìm thấy bài viết",
        });
    }
    return res.json(post);
});
// POST api/posts
postRouter.post("/", (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content,
    };
    posts.push(newPost);
    return res.status(201).json(newPost);
});

postRouter.put("/:id", (req, res) => {
    const post = posts.find((item) => item.id == Number(req.params.id));
    if (!post) {
        return res.status(404).json({
            message: "Không tìm thấy bài viết",
        });
    }
    const { title, content } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    return res.json(post);
});
postRouter.delete("/:id", (req, res) => {
    const post = posts.findIndex((item) => item.id === Number(req.params.id));
    posts.splice(post, 1);
    return res.json({
        message: "Xóa bài viết thành công",
    });
});
export default postRouter;
