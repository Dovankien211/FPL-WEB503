// filepath: /path/to/models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
});
const User = mongoose.model("User", userSchema);

// filepath: /path/to/models/Product.js
const productSchema = new Schema({
    name: String,
    price: Number,
});

const Product = mongoose.model("Product", productSchema);

// filepath: /path/to/models/Order.js
const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    total: Number,
});
const Order = mongoose.model("Order", orderSchema);

module.exports = { User, Product, Order };
