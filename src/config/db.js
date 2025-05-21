import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/wd20104");
    } catch (error) {
        console.error("Lỗi kết nối MongoDB:", error.message);
        process.exit(1);
    }
};
export default connectDb;
