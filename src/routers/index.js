import { Router } from "express";
import postRouter from "./posts";

const router = Router();

// router bài viết

router.use("/posts", postRouter);
export default router;
