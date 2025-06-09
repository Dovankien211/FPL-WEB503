// filepath: /path/to/scripts/getOrderDetails.js
const mongoose = require("mongoose");
const { Order } = require("../model-test/models");

async function getOrderDetails(orderId) {
    await mongoose.connect("mongodb://localhost:27017/populateExample");

    const order = await Order.findById(orderId)
        .populate("user", "name email")
        .populate("products", "name price");

    console.log("Order Details:");
    console.log(`Customer: ${order.user.name} (${order.user.email})`);
    console.log("Products:");
    order.products.forEach((product) => {
        console.log(`- ${product.name}: $${product.price}`);
    });
    console.log(`Total: $${order.total}`);

    await mongoose.disconnect();
}

getOrderDetails("68467a5ae8975b32013f51dd"); // Replace 'ORDER_ID' with the actual order ID
