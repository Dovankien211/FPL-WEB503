import express from "express";
import { signin, signup } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { signupSchema } from "../validation/auth.validation";

const authRouter = express.Router();

authRouter.post("/signup", validateRequest(signupSchema), signup);
authRouter.post("/signin", signin);
export default authRouter;
