import Category from "../models/category";
import Product from "../models/product";
export const getCategoryById = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id });
        return res.json({
            products,
        });
    } catch (error) {}
};
