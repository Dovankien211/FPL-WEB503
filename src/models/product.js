import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
        },
        price: {
            type: Number,
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);
