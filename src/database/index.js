import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/WD503-03");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};
