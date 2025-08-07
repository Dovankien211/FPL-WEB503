import { Router } from "express";
import postRouter from "./post.router";
import productRouter from "./product.router";
import authRouter from "./auth.router";
const router = Router();
// api/posts
router.use("/posts", postRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);
export default router;
