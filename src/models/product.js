import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
