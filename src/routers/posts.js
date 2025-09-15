import { Router } from "express";

const postRouter = Router();

postRouter.get("/", (req, res) => {
    return res.json({
        message: "Danh sách bài viết",
    });
});
postRouter.get("/:id", (req, res) => {
    return res.json({
        message: "Chi tiết bài viết",
    });
});
export default postRouter;
