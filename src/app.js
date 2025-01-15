import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/product";

const app = express();

app.use(express.json());

// kết nối database

mongoose.connect(`mongodb://localhost:27017/wd19320`);

app.use("/api", productRouter);
// http://localhost:3000/api/products

export const viteNodeApp = app;
