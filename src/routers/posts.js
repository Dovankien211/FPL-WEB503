import express from "express";

const routePosts = express.Router();
let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" }, // 1 ==
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" }, // p
];
routePosts.get("/", (req, res) => {
    res.json(posts);
});
routePosts.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id === +req.params.id);
    if (!post)
        return res.status(404).json({
            message: "Không có bài viết nào!",
        });
    return res.json(post);
});
routePosts.post("/", (req, res) => {
    console.log(req.body);
});
routePosts.put("/", () => {
    console.log("Cập nhật bài viết");
});
routePosts.delete("/", () => {
    console.log("Xóa bài viết");
});

export default routePosts;
