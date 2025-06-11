import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getRelatedProducts,
} from "../controllers/product";
import { validateRequest } from "../middleware/validateRequest";
import { createProductSchema, updateProductSchema } from "../validations/product";
import { restrictTo, verifyJWT } from "../middleware/authMiddleware";

const routeProduct = Router();

// Lấy danh sách sản phẩm
routeProduct.get("/", getProducts);

// Lấy chi tiết sản phẩm
routeProduct.get("/:id", getProductById);

// sản phẩm liên quan
routeProduct.get("/related/:id", getRelatedProducts);
routeProduct.use(verifyJWT);
routeProduct.use(restrictTo("admin"));

// Thêm sản phẩm mới
routeProduct.post("/", validateRequest(createProductSchema), createProduct);
// Cập nhật sản phẩm
routeProduct.put("/:id", validateRequest(updateProductSchema), updateProduct);
// Xóa sản phẩm
routeProduct.delete("/:id", deleteProduct);

export default routeProduct;
