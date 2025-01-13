const data = [
    { id: 1, name: "A", price: 100 }, // product
    { id: 2, name: "B", price: 200 },
    { id: 3, name: "C", price: 300 }, // product.id = 3
];

/**
 * @route   GET /products
 * @desc    Lấy toàn bộ danh sách sản phẩm
 * @access  Public
 * @returns {Array} Danh sách sản phẩm
 *
 * Response Example:
 * [
 *     { "id": 1, "name": "Product A", "price": 100 },
 *     { "id": 2, "name": "Product B", "price": 200 },
 *     { "id": 3, "name": "Product C", "price": 300 },
 *     { "id": 4, "name": "Product D", "price": 400 }
 * ]
 */
export const getProducts = (req, res) => {
    res.json(data);
};
export const getProductById = (req, res) => {
    const product = data.find((item) => item.id === +req.params.id);
    return res.status(200).json(product);
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
export const createProduct = (req, res) => {
    const { id, name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({
            message: "Thiếu trường dữ liệu",
        });
    }
    const existProduct = data.find((item) => item.id === id);
    if (existProduct) {
        return res.status(400).json({
            message: "Sản phẩm đã tồn tại",
        });
    }
    const newProduct = { id, name, price };
    data.push(newProduct);

    return res.status(201).json(newProduct);
};

/**
 * @route   DELETE /products/:id
 * @desc    Xóa một sản phẩm theo ID
 * @access  Public
 * @param   {number} req.params.id - ID của sản phẩm cần xóa
 * @returns {Object} Thông báo trạng thái và thông tin sản phẩm đã xóa
 * */
export const removeProduct = (req, res) => {
    const { id } = req.params;
    const product = data.find((item) => item.id === +id);
    if (!product) {
        return res.status(404).json({
            message: "Sản phẩm không tồn tại!",
        });
    }
    // xóa sản phẩm
    data.filter((product) => product.id !== +id);
    return res.status(200).json({
        message: "Xóa sản phẩm thành công",
        data: product,
    });
};

export const updateProduct = (req, res) => {
    const existProduct = data.find((item) => item.id === +req.params.id);
    if (!existProduct) {
        return res.status(404).json({
            message: "Sản phẩm không tồn tại!",
        });
    }
    // cập nhật
    data.map((product) => (product.id === +req.params.id ? req.body : product));

    return res.status(200).json({
        message: "Cập nhật thành công!",
        data: { ...existProduct, ...req.body },
    });
};
