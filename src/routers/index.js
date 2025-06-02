import express from "express";
import routePost from "./post";
const router = express.Router();

router.use("/posts", routePost);

export default router;
