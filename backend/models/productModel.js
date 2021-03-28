import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    image1: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String, required: true},
    description: {type: String, required: true},
    countInStock: {type: Number, default: 0, required: true},
},{
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;