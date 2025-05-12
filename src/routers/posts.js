import express from "express";

const routePost = express.Router();

routePost.get("/", () => {
    console.log("Danh sách bài viết");
});
routePost.get("/:id", () => {
    console.log("Một bài viết");
});

export default routePost;
