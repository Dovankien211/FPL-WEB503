import express from "express";

const router = express.Router();

router.get("/posts", () => {
    console.log("Danh sách bài viết");
});

export default router;

// router.post();
// router.put();
// router.delete();

// RESTFUL API
// GET: Lấy dữ liệu
// POST: Tạo dữ liệu
// PUT: Cập nhật dữ liệu
// DELETE: Xóa dữ liệu
