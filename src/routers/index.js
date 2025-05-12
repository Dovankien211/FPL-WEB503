import express from "express";
import routePosts from "./posts.js";

const router = express.Router();

router.use("/posts", routePosts);

export default router;
