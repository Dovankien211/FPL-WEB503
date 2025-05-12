import express from "express";

const routePosts = express.Router();

routePosts.get("/", () => {
    console.log("Trả về danh sách bài viết");
});
routePosts.get("/:id", () => {
    console.log("Trả một bài viết");
});
routePosts.post("/", () => {
    console.log("Thêm bài viết");
});
routePosts.put("/", () => {
    console.log("Cập nhật bài viết");
});
routePosts.delete("/", () => {
    console.log("Xóa bài viết");
});

export default routePosts;
