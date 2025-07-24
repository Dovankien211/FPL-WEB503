import { Router } from "express";
import postRouter from "./posts";

const router = Router();
// api/posts
router.use("/posts", postRouter);
export default router;
