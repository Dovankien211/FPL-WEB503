import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Tên sản phẩm là bắt buộc"],
            trim: true,
            maxlength: [200, "Tên sản phẩm không được vượt quá 200 ký tự"],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Danh mục sản phẩm là bắt buộc"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, "Mô tả sản phẩm là bắt buộc"],
        },
        price: {
            type: Number,
            required: [true, "Giá sản phẩm là bắt buộc"],
            min: [0, "Giá sản phẩm không được âm"],
        },
        discountPrice: {
            type: Number,
            min: [0, "Giá khuyến mãi không được âm"],
        },
        images: [String],
        stock: {
            type: Number,
            required: [true, "Số lượng tồn kho là bắt buộc"],
            min: [0, "Số lượng tồn kho không được âm"],
            default: 0,
        },
        sku: {
            type: String,
            required: [true, "SKU sản phẩm là bắt buộc"],
            unique: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
        featured: {
            type: Boolean,
            default: false,
        },
        ratings: {
            type: Number,
            default: 0,
            min: [0, "Đánh giá thấp nhất là 0"],
            max: [5, "Đánh giá cao nhất là 5"],
            set: (val) => Math.round(val * 10) / 10, // Làm tròn đến 1 chữ số thập phân
        },
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);

export default Product;
