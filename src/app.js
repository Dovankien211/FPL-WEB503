import express from "express";
import dotenv from "dotenv";
import postRouter from "./routers/posts";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use("/api/posts", postRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
