import { Router } from "express";
import {
    createProduct,
    getProductById,
    getProducts,
    removeProduct,
    updateProduct,
} from "../controllers/product";
const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.delete("/products/:id", removeProduct);
router.put("/products/:id", updateProduct);

export default router;
