import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/product";
import authRouter from "./routers/auth";

const app = express();

app.use(express.json());

// kết nối database

mongoose.connect(`mongodb://localhost:27017/wd19320`);

app.use("/api", productRouter);
app.use("/api", authRouter);
export const viteNodeApp = app;
