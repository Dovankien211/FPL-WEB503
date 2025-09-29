import { Router } from "express";
import postRouter from "./posts";
import authRouter from "./auth";

const router = Router();

// router bài viết

router.use("/posts", postRouter);
router.use("/auth", authRouter);
export default router;
