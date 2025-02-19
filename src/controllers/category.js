import Product from "../models/product";
import Category from "../models/category";

export const getCategory = async (req, res) => {
    // ví dụ: id danh mục = 1
    // categories/1
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(400).json({
                message: "Không có danh mục nào!",
            });
        }
        const products = await Product.find({ categoryId: id });
        return res.status(200).json({
            name: category.name,
            products,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        if (!category) {
            return res.status(400).json({
                message: error.message,
            });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
