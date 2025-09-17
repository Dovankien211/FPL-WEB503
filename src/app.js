import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routers/posts";

dotenv.config();

const app = express();

// Kết nối db
// mongoose.connect(`mongodb://localhost:27017/web503`);
// middleware
app.use(express.json());

// router
app.post("/posts", (req, res) => {
    console.log(req.body);
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
