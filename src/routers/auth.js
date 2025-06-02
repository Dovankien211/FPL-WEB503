import express from "express";
import { signup, signin } from "../controllers/auth";
import { validateRequest } from "../middlewares/verifyRequest";
import { signinSchema, signupSchema } from "../validations/authValidation.js";
const routeAuth = express.Router();

// Route đăng ký
routeAuth.post("/signup", validateRequest(signupSchema), signup);

// Route đăng nhập
routeAuth.post("/signin", validateRequest(signinSchema), signin);

// Route lấy thông tin người dùng hiện tại

export default routeAuth;
