import { Router } from "express";
import postRouter from "./post.router";

const router = Router();
// api/posts
router.use("/posts", postRouter);
export default router;
