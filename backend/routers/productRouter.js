import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import {data} from "../data.js";
import express from "express";
import {isAdmin, isAuth} from "../util.js";


export const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
}));

productRouter.get("/seed",
    expressAsyncHandler(async (req, res) => {
        await Product.remove({});
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

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        const deleteProduct = await product.remove();
        res.send({message: 'Product Deleted', product: deleteProduct});
    }else{
        res.status(404).send({message: 'Product Not Found'});
    }
}));

productRouter.post('/createproduct', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        image1: req.body.image1,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        thumbnail: req.body.thumbnail,
        description: req.body.description
    });
    const createdProduct = await product.save();
    res.send({message: 'Product was created', product: createdProduct});

}));