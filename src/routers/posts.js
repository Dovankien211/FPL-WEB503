import express from "express";

const routePost = express.Router();

routePost.get("/", () => {
    console.log("Danh sách bài viết");
});
routePost.get("/:id", () => {
    console.log("Một bài viết");
});
routePost.post("/", (req, res) => {
    const { name, content } = req.body;
    return res.json({
        name,
        content,
    });
});

export default routePost;
