import express from "express";
import dotenv from "dotenv";
import router from "./routers/index.js";

dotenv.config();
const app = express();

app.use("/api", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3000`);
});
