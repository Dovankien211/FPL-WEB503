import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    relatedProducts,
} from "../controllers/product";

const routeProduct = Router();

// Lấy danh sách sản phẩm
routeProduct.get("/", getProducts);

// Lấy chi tiết sản phẩm
routeProduct.get("/:id", getProductById);
routeProduct.get("/related/:id", relatedProducts);

// Thêm sản phẩm mới
routeProduct.post("/", createProduct);

// Cập nhật sản phẩm
routeProduct.put("/:id", updateProduct);

// Xóa sản phẩm
routeProduct.delete("/:id", deleteProduct);

export default routeProduct;
