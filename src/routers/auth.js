import express from "express";

import { signin, signup } from "../controllers/auth";
import { validateRequest } from "../middleware/validateRequest";
import { signinSchema, signupSchema } from "../validations/auth";
const authRouter = express.Router();

authRouter.post("/signup", validateRequest(signupSchema), signup);
authRouter.post("/signin", validateRequest(signinSchema), signin);

export default authRouter;
