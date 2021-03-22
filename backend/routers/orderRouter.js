
import express from "express";
import {isAdmin, isAuth} from "../util.js";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";


const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if(req.body.orderItems.length === 0){
        res.status(400).send({message: 'Cart is empty'});
    }else{
        const order =  new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            deliveryMethod: req.body.deliveryMethod,
            paymentMethod: req.body.paymentMethod,
            cartPrice: req.body.cartPrice,
            deliveryPrice: req.body.deliveryPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createOrder = await order.save();
        res.status(201).send({message: 'New order created', order: createOrder});
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: 'Order not found'});
    }
}));

export default orderRouter;