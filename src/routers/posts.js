import { Router } from "express";

const postRouter = Router();

// GET api/posts
postRouter.get("/", (req, res) => {
    return res.json({
        message: "Danh sách bài viết",
    });
});
// POST api/posts
postRouter.post("/", (req, res) => {
    // const title = req.body.title;
    // const content = req.body.content;
    const { title, content } = req.body;

    return res.status(201).json({
        message: "Thêm bài viết thành công",
        data: { title, content },
    });
});
export default postRouter;
// Client -> submit form (form data) =>middleware(express.json()) =>server nhận dữ liệu (req.body)
