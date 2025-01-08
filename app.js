import express from "express";

const app = express();

// middleware
app.use(express.json());
// data fake
const data = [
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product A", price: 200 },
    { id: 3, name: "Product C", price: 200 },
];
// routing của express hỗ trợ
app.get("/products", (req, res) => {
    return res.status(200).json(data);
});

app.get("/products/:id", (req, res) => {
    const product = data.find((item) => item.id === +req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "Không có sản phẩm nào!",
        });
    }
    return res.status(200).json(product);
});
app.post("/products", (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Dữ liệu không hợp lệ!",
        });
    }
    const products = [...data, req.body];
    return res.status(201).json(products);
});

export const viteNodeApp = app;
