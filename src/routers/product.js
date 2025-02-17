import {
    createProduct,
    getProductById,
    getProducts,
    removeProduct,
    updateProduct,
} from "../controllers/product";
import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.get(`/products`, getProducts);
router.get(`/products/:id`, getProductById);
router.post(`/products`, checkAuth, createProduct);
router.put(`/products/:id`, checkAuth, updateProduct);
router.delete(`/products/:id`, checkAuth, removeProduct);
export default router;
