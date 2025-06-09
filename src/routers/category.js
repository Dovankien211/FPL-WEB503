import { Router } from "express";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category";

const routeCategory = Router();

// Lấy danh sách sản phẩm
routeCategory.get("/", getCategories);

// Lấy chi tiết sản phẩm
routeCategory.get("/:id", getCategoryById);

// Thêm sản phẩm mới
routeCategory.post("/", createCategory);

// Cập nhật sản phẩm
routeCategory.put("/:id", updateCategory);

// Xóa sản phẩm
routeCategory.delete("/:id", deleteCategory);

export default routeCategory;
