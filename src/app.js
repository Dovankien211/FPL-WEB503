import express from "express";
import dotenv from "dotenv";
import router from "./routers";
import connectDb from "./config/db";
dotenv.config();

const app = express();
connectDb();
// middleware

app.use(express.json());
// router
app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
