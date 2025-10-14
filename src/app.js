import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "../src/routes/post.js"; // thêm đây 
dotenv.config();

const app = express();

// Kết nối db
mongoose.connect(`mongodb://localhost:27017/web503`);
// middleware

app.use(express.json());
// router

const port = process.env.PORT || 3000;
app.use("/posts", postRouter); // thêm đây
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
