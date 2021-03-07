import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import {data} from "../data.js";
import express from "express";


export const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get("/seed",
    expressAsyncHandler(async (req, res) => {
        const products = await Product.insertMany(data.products)
        res.send({products});
    })
);

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else {
        res.status(404).send({message: "Product not Found"});
    }
}));