import express from "express";
import routePost from "./post";
import routeAuth from "./auth";
import routeProduct from "./product";
import routeCategory from "./category";
const router = express.Router();

router.use("/posts", routePost);
router.use("/auth", routeAuth);
router.use("/products", routeProduct);
router.use("/categories", routeCategory);
export default router;
