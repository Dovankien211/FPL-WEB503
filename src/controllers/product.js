import Product from "../models/product";

// Lấy danh sách sản phẩm
export const getProducts = async (req, res) => {
    // /products?_sort=price&_order=desc

    const { _page = 1, _limit = 10, _sort = "price", _order = "desc" } = req.query;
    const options = {
        select: "name price category",
        page: _page,
        limit: _limit,
        populate: "category",
        sort: {
            [_sort]: _order === "desc" ? 1 : -1,
        },
    };
    try {
        const products = await Product.paginate({}, options);
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

export const getRelatedProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(400).json({
                message: "Không tìm thấy sản phẩm",
            });
        const products = await Product.find({
            category: product.category,
            _id: { $ne: product._id },
        });
        return res.status(200).json(products);
    } catch (error) {}
};
// Bước 1: Cài đặt joi
// Bước 2: Tạo Schema
// Bước 3: Sử dụng joi để validate dữ liệu : schema.validate(req.body)

/**
 * - Tìm Id danh mục
 * - tìm sản phẩm có id là danh mục đấy
 */
