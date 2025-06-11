import Category from "../models/category";
import Product from "../models/product";
export const getCategories = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({
            products,
        });
    } catch (error) {}
};
export const getCategoryById = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id });
        return res.json({
            products,
        });
    } catch (error) {}
};
export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        return res.json({
            category,
        });
    } catch (error) {}
};
