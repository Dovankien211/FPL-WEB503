import { Router } from "express";
import { createCategory, getCategories, getCategoryById } from "../controllers/category";

const routeCategory = Router();

// Lấy danh sách sản phẩm
routeCategory.get("/", getCategories);

// Lấy chi tiết sản phẩm
routeCategory.get("/:id", getCategoryById);

// Thêm sản phẩm mới
routeCategory.post("/", createCategory);
// Cập nhật sản phẩm

export default routeCategory;
