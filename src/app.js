import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./routers/product";

import authRouter from "./routers/auth";
const app = express();

// middleware
app.use(express.json());
app.use(cors());
// Kết nối db
mongoose.connect(`mongodb://localhost:27017/wd19321`);

// routers
app.use("/api", productRouter);
app.use("/api", authRouter);

export const viteNodeApp = app;
