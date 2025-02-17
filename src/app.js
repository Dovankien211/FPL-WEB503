import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./routers/product";
import dotenv from "dotenv";
import authRouter from "./routers/auth";
import morgan from "morgan";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Kết nối db
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

// routers
app.use("/api", productRouter);
app.use("/api", authRouter);

export const viteNodeApp = app;
