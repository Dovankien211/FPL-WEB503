import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/database";
import router from "./routers";
dotenv.config();
const app = express();
connectDB();

// middleware
app.use(express.json());
// logger
app.use(morgan("dev"));

// router
app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
