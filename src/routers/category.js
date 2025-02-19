import { Router } from "express";
import { createCategory, getCategory } from "../controllers/category";

const router = Router();

router.get("/categories/:id", getCategory);
router.post("/categories", createCategory);
export default router;
