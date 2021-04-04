
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
            user: req.user._id,
        });
        const createOrder = await order.save();
        res.status(201).send({message: 'New order created', order: createOrder});
    }
}));

orderRouter.get('/my', isAuth, expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
);


orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };
            const updatedOrder = await order.save();
            res.send({ message: 'Order Paid', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: 'Order not found'});
    }
}));

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        const deleteOrder = await order.remove();
        res.send({ message: 'Order deleted', order: deleteOrder});
    } else {
        res.status(404).send({message: 'Order Not Found'});
    }
}));

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            const updatedOrder = await order.save();
            res.send({ message: 'Order Delivered', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);


orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'email');
    res.send(orders);
}));



export default orderRouter;