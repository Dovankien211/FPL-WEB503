// filepath: /path/to/scripts/addSampleData.js
const mongoose = require("mongoose");
const { User, Product, Order } = require("../model-test/models");

async function addSampleData() {
    await mongoose.connect("mongodb://localhost:27017/populateExample");

    const user = await User.create({ name: "Nguyễn Văn A", email: "nguyenvana@example.com" });
    const product1 = await Product.create({ name: "Laptop", price: 1500 });
    const product2 = await Product.create({ name: "Mouse", price: 50 });

    const order = await Order.create({
        user: user._id,
        products: [product1._id, product2._id],
        total: 1550,
    });

    console.log("Sample data added successfully!");
    await mongoose.disconnect();
}

addSampleData();
