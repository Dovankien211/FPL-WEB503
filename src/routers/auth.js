import { signup } from "../controllers/auth";
import express from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { signupSchema } from "../validations/auth";

const authRouter = express.Router();

authRouter.post("/signup", validateRequest(signupSchema), signup);
export default authRouter;
