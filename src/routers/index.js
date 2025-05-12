import express from "express";
import routePost from "./posts.js";

const router = express.Router();

router.use("/posts", routePost);

export default router;

// router.post();
// router.put();
// router.delete();

// RESTFUL API
// GET: Lấy dữ liệu
// POST: Tạo dữ liệu
// PUT: Cập nhật dữ liệu
// DELETE: Xóa dữ liệu
