import Category from "../models/category";
import Product from "../models/product";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server", message: err.message });
    }
};

// Lấy chi tiết danh mục
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ error: "Không tìm thấy danh mục" });

        const products = await Product.find({ category: category._id });
        res.json({
            ...category.toObject(),
            products,
        });
    } catch (err) {
        res.status(500).json({ error: "Lỗi server", message: err.message });
    }
};

// Thêm danh mục mới
export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: "Lỗi khi thêm danh mục", message: err.message });
    }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!category) return res.status(404).json({ error: "Không tìm thấy danh mục" });
        res.json(category);
    } catch (err) {
        res.status(400).json({ error: "Lỗi khi cập nhật danh mục", message: err.message });
    }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: "Không tìm thấy danh mục" });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Lỗi server", message: err.message });
    }
};
