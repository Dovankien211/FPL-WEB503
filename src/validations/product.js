import Joi from "joi";

export const createProductSchema = Joi.object({
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
export const updateProductSchema = createProductSchema.fork(
    ["name", "description", "price"],
    (schema) => schema.optional()
);
