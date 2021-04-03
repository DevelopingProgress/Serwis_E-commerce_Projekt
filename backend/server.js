import express from "express";
import mongoose from 'mongoose';
import {userRouter} from "./routers/userRouter.js";
import dotenv from 'dotenv';
import {productRouter} from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://kacpgaw020:Gawlokacpi1@ecommerce.lga1d.mongodb.net/SerwisE-CommerceProjekt?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/api/config/paypal', (req, res) => {
    const paypalId = process.env.PAYPAL_CLIENT || 'sb';
    res.send(paypalId);
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log('Server listening on port 5000');
});