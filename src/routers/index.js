import { Router } from "express";
import postRouter from "./post.router";
import productRouter from "./product.router";
const router = Router();
// api/posts
router.use("/posts", postRouter);
router.use("/products", productRouter);
export default router;
