import Product from "../models/product";
import Joi from "joi";

const createProductSchema = Joi.object({
    name: Joi.string().trim().max(200).required().messages({
        "string.base": "Tên sản phẩm phải là chuỗi",
        "string.empty": "Tên sản phẩm là bắt buộc",
        "string.max": "Tên sản phẩm không được vượt quá 200 ký tự",
        "any.required": "Tên sản phẩm là bắt buộc",
    }),

    slug: Joi.string().lowercase().optional().messages({
        "string.base": "Slug phải là chuỗi",
    }),

    description: Joi.string().required().messages({
        "string.empty": "Mô tả sản phẩm là bắt buộc",
        "any.required": "Mô tả sản phẩm là bắt buộc",
    }),

    price: Joi.number().min(0).required().messages({
        "number.base": "Giá sản phẩm phải là số",
        "number.min": "Giá sản phẩm không được âm",
        "any.required": "Giá sản phẩm là bắt buộc",
    }),

    discountPrice: Joi.number().min(0).optional().messages({
        "number.min": "Giá khuyến mãi không được âm",
    }),

    images: Joi.array().items(Joi.string()),

    stock: Joi.number().min(0).required().default(0).messages({
        "number.base": "Số lượng tồn kho phải là số",
        "number.min": "Số lượng tồn kho không được âm",
        "any.required": "Số lượng tồn kho là bắt buộc",
    }),

    sku: Joi.string().trim().required().messages({
        "string.empty": "SKU sản phẩm là bắt buộc",
        "any.required": "SKU sản phẩm là bắt buộc",
    }),

    status: Joi.string().valid("draft", "published", "archived").default("draft"),

    featured: Joi.boolean().default(false),

    ratings: Joi.number().min(0).max(5).precision(1).default(0).messages({
        "number.min": "Đánh giá thấp nhất là 0",
        "number.max": "Đánh giá cao nhất là 5",
    }),
});

// Lấy danh sách sản phẩm
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server", message: err.message });
    }
};

// Lấy chi tiết sản phẩm
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server", message: err.message });
    }
};

// Thêm sản phẩm mới
export const createProduct = async (req, res) => {
    try {
        const { error } = createProductSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                error: "Dữ liệu không hợp lệ",
                details: error.details.map((err) => err.message),
            });
        }

        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: "Lỗi khi thêm sản phẩm", message: err.message });
    }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: "Lỗi khi cập nhật sản phẩm", message: err.message });
    }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Lỗi server", message: err.message });
    }
};
