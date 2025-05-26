import Joi from "joi";

// Schema tạo sản phẩm mới
export const createProductSchema = Joi.object({
    name: Joi.string().required().max(200).messages({
        "string.base": "Tên sản phẩm phải là chuỗi",
        "string.empty": "Tên sản phẩm không được để trống",
        "string.max": "Tên sản phẩm không được vượt quá {#limit} ký tự",
        "any.required": "Tên sản phẩm là bắt buộc",
    }),
    slug: Joi.string().required().messages({
        "string.base": "Slug phải là chuỗi",
        "string.empty": "Slug không được để trống",
        "any.required": "Slug là bắt buộc",
    }),
    description: Joi.string().required().messages({
        "string.base": "Mô tả sản phẩm phải là chuỗi",
        "string.empty": "Mô tả sản phẩm không được để trống",
        "any.required": "Mô tả sản phẩm là bắt buộc",
    }),
    price: Joi.number().required().min(0).messages({
        "number.base": "Giá sản phẩm phải là số",
        "number.min": "Giá sản phẩm không được âm",
        "any.required": "Giá sản phẩm là bắt buộc",
    }),
    discountPrice: Joi.number().min(0).max(Joi.ref("price")).messages({
        "number.base": "Giá khuyến mãi phải là số",
        "number.min": "Giá khuyến mãi không được âm",
        "number.max": "Giá khuyến mãi phải nhỏ hơn hoặc bằng giá gốc",
    }),
    images: Joi.array().items(Joi.string()).messages({
        "array.base": "Hình ảnh phải là mảng các chuỗi",
    }),
    stock: Joi.number().required().min(0).messages({
        "number.base": "Số lượng tồn kho phải là số",
        "number.min": "Số lượng tồn kho không được âm",
        "any.required": "Số lượng tồn kho là bắt buộc",
    }),
    sku: Joi.string().required().messages({
        "string.base": "SKU phải là chuỗi",
        "string.empty": "SKU không được để trống",
        "any.required": "SKU là bắt buộc",
    }),
    status: Joi.string().valid("draft", "published", "archived").default("draft").messages({
        "string.base": "Trạng thái phải là chuỗi",
        "any.only": "Trạng thái chỉ có thể là 'draft', 'published', hoặc 'archived'",
    }),
    featured: Joi.boolean().default(false).messages({
        "boolean.base": "Featured phải là giá trị boolean",
    }),
    ratings: Joi.number().min(0).max(5).default(0).messages({
        "number.base": "Đánh giá phải là số",
        "number.min": "Đánh giá không được nhỏ hơn 0",
        "number.max": "Đánh giá không được lớn hơn 5",
    }),
});

// Schema cập nhật sản phẩm
export const updateProductSchema = createProductSchema.fork(
    ["name", "description", "price"],
    (schema) => schema.optional()
);
