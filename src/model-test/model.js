const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
});

const User = mongoose.model("User", userSchema);

const productSchema = new Schema({
    name: String,
    price: Number,
});

const Product = mongoose.model("Product", productSchema);

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    total: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { User, Order, Product };
