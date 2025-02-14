import Joi from "joi";
import Product from "../models/product";

// schema
const productSchema = Joi.object({
    name: Joi.string().required().min(3).messages({
        "string.empty": "Tên sản phẩm không được để trống",
        "string.min": "Tên sản phẩm phải có ít nhất {#limit} ký tự",
        "any.required": "Tên sản phẩm là bắt buộc",
    }),
    price: Joi.number().required().min(0).messages({
        "number.base": "Giá sản phẩm phải là số",
        "number.empty": "Giá sản phẩm không được để trống",
        "number.min": "Giá sản phẩm phải lớn hơn hoặc bằng {#limit}",
    }),
});

/**
 * @route   GET /products
 * @desc    Lấy toàn bộ danh sách sản phẩm
 * @access  Public
 * @returns {Array} Danh sách sản phẩm
 */
export const getProducts = async (req, res) => {
    const { _limit = 10, _page, _sort = "price", _order = "asc" } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        const products = await Product.paginate({}, options);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

/**
 * @route   POST /products
 * @desc    Thêm một sản phẩm mới vào danh sách
 * @access  Public
 * @param   {Object} req.body - Dữ liệu sản phẩm được gửi trong body của request
 * @property {number} id - ID của sản phẩm (tuỳ chọn)
 * @property {string} name - Tên của sản phẩm (bắt buộc)
 * @property {number} price - Giá của sản phẩm (bắt buộc)
 * @returns {Object} Thông tin sản phẩm vừa được thêm hoặc thông báo lỗi
 * */
export const createProduct = async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body, {
            abortEarly: false, // cho phép hiển thị nhiều lỗi
            convert: false, // không tự động chuyển đổi dữ liệu
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json(errors);
        }
        const product = await Product.create(value);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

/**
 * @route   DELETE /products/:id
 * @desc    Xóa một sản phẩm theo ID
 * @access  Public
 * @param   {number} req.params.id - ID của sản phẩm cần xóa
 * @returns {Object} Thông báo trạng thái và thông tin sản phẩm đã xóa
 * */
export const removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Sản phẩm không tồn tại!",
            });
        }
        return res.status(200).json({
            message: "Xóa sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body, {
            abortEarly: false, // cho phép hiển thị nhiều lỗi
            convert: false, // không tự động chuyển đổi dữ liệu
        });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json(errors);
        }
        const product = await Product.findByIdAndUpdate(req.params.id, value, { new: true });

        if (!product) {
            return res.status(404).json({
                message: "Sản phẩm không tồn tại!",
            });
        }
        return res.status(200).json({
            message: "Cập nhật phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
