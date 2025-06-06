// filepath: /path/to/scripts/getOrderDetails.js
const mongoose = require("mongoose");
const { Order } = require("../model-test/model");

async function getOrderDetails(orderId) {
    await mongoose.connect("mongodb://localhost:27017/demoPopulate");

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

getOrderDetails("6842a6184bfef01e13e0d883"); // Replace 'ORDER_ID' with the actual order ID
