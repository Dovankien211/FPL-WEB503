import { Router } from "express";
import routePost from "./posts";
import routeProduct from "./product";

const router = Router();

// Sử dụng router cho bài viết
router.use("/posts", routePost);

// Sử dụng router cho sản phẩm
router.use("/products", routeProduct);

export default router;
