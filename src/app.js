import express from "express";
import dotenv from "dotenv";
import router from "./routers";
import { connectDB } from "./database";

dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", router);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
