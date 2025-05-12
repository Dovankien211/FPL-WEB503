import express from "express";
import dotenv from "dotenv";
import router from "./routers";

dotenv.config();
const app = express();

app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
