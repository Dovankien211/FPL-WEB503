import express from "express";
import dotenv from "dotenv";
import router from "./routers";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());

// routers
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
