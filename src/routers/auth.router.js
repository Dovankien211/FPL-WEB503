import express from "express";
import { signin, signup } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { signinSchema, signupSchema } from "../validation/auth.validation";

const authRouter = express.Router();

authRouter.post("/signup", validateRequest(signupSchema), signup);
authRouter.post("/signin", validateRequest(signinSchema), signin);
export default authRouter;
