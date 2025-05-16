import express from "express";

const routePosts = express.Router();

routePosts.get("/", (req, res) => {
    res.json({
        message: "Danh sách bài viết",
    });
});
routePosts.get("/:id", () => {
    console.log("Trả một bài viết");
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
