import express from "express";

const app = express();

// data fake
const data = [
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product A", price: 200 },
    { id: 3, name: "Product C", price: 200 },
];
// routing của express hỗ trợ
app.get("/products", (req, res) => {
    console.log("req.query", req.query);
    console.log("req:params", req.params);
    res.status(200).json(data);
});

export const viteNodeApp = app;
