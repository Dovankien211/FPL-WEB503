import { Router } from "express";
import routePost from "./posts";
import routeProduct from "./product";
import authRouter from "./auth";

const router = Router();

// Sử dụng router cho bài viết
router.use("/posts", routePost);

// Sử dụng router cho sản phẩm
router.use("/products", routeProduct);

// Sử dụng router cho sản phẩm
router.use("/auth", authRouter);
export default router;
