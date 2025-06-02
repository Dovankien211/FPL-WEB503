import express from "express";
import routePost from "./post";
import routeAuth from "./auth";
const router = express.Router();

router.use("/posts", routePost);
router.use("/auth", routeAuth);
export default router;
