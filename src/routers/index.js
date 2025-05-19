import { Router } from "express";
import routePost from "./posts";

const router = Router();

router.use("/posts", routePost);

export default router;
