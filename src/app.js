import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routers/posts";

dotenv.config();

const app = express();

// Kết nối db
// mongoose.connect(`mongodb://localhost:27017/web503`);
// middleware

// app.use(express.json());
// router

// app.use("/posts", postRouter);

app.use("/hello", (req, res) => {
    const name = req.query.name || "Bạn!";
    return res.json({
        message: `Hello ${name}`,
    });
});
app.use("/posts/:id", (req, res) => {
    const id = req.params.id;
    return res.json({
        message: `Chi tiết bài viết ${id}`,
    });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
