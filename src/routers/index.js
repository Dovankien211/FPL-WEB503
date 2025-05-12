import express from "express";
import routePosts from "./posts";

const router = express.Router();

router.use("/posts", routePosts);

export default router;
