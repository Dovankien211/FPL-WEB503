import express from "express";
import { signup } from "../controllers/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { signupSchema } from "../validations/auth";

const authRouter = express.Router();
// POST api/auth/signup
authRouter.post("/signup", validateRequest(signupSchema), signup);

export default authRouter;

// khai báo model
// khai báo controller
// khai báo router
// khai báo validation
// Sử dụng validateRequest để validate dữ liệu trước khi vào controller
