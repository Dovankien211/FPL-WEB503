import express from "express";

import { signup } from "../controllers/auth";
import { validateRequest } from "../middleware/validateRequest";
import { signupSchema } from "../validations/auth";
const authRouter = express.Router();

authRouter.post("/signup", validateRequest(signupSchema), signup);

export default authRouter;
