import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product";
import { validateRequest } from "../middlewares/validateRequest";
import { createProductSchema, updateProductSchema } from "../validations/product";

const routeProduct = Router();

// Lấy danh sách sản phẩm
routeProduct.get("/", getProducts);

// Lấy chi tiết sản phẩm
routeProduct.get("/:id", getProductById);

// Thêm sản phẩm mới
routeProduct.post("/", validateRequest(createProductSchema), createProduct);

// Cập nhật sản phẩm
routeProduct.put("/:id", validateRequest(updateProductSchema), updateProduct);

// Xóa sản phẩm
routeProduct.delete("/:id", deleteProduct);

export default routeProduct;
