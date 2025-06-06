// import { User, Product, Order } from "../model-test/model";
const mongoose = require("mongoose");
const { User, Product, Order } = require("../model-test/model");
const createOrder = async () => {
    await mongoose.connect("mongodb://localhost:27017/demoPopulate");
    const user = await User.create({ name: "Nguyễn Văn A", email: "nguyenvana@example.com" });
    const product1 = await Product.create({ name: "Laptop", price: 1500 });
    const product2 = await Product.create({ name: "Mouse", price: 50 });

    const order = await Order.create({
        user: user._id,
        products: [product1._id, product2._id],
        total: 1550,
    });
    console.log("Create Order Successfully!");
};
createOrder();
