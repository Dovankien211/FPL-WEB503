import express from "express";
import productRouter from "./routers/product";

const app = express();

app.use(express.json());

app.use("/api", productRouter);
// http://localhost:3000/api/products

export const viteNodeApp = app;
