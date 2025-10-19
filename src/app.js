import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postsRouter from "./routes/posts.js";

dotenv.config();

const app = express();

// Kết nối db
mongoose.connect(`mongodb://localhost:27017/web503`);

// middleware
app.use(express.json());

// router
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API quản lý bài viết - WEB503',
    version: '1.0.0'
  });
});

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Server hoạt động tốt!',
    status: 'OK'
  });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
