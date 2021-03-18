import express from "express";
import User from "../models/userModel.js";
import {data} from "../data.js";
import expressAsyncHandler from 'express-async-handler';
import {generateToken} from "../util.js";
import bcrypt from "bcryptjs";

export const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) =>{
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }else {
            res.status(401).send({message: 'Niepoprawny email lub hasło'});
        }
    }else {
        res.status(401).send({message: 'Niepoprawny email lub hasło'});
    }

}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        acceptedRules: req.body.acceptedRules,
    });
    const createduser = await user.save();
    if(createduser) {
        res.send({
            _id: createduser._id,
            name: createduser.name,
            email: createduser.email,
            isAdmin: createduser.isAdmin,
            token: generateToken(createduser),
        });
    }else {
        res.status(402).send({message: 'Niepoprawne dane'});
    }

}));

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user);
    }else {
        res.status(404).send({message: "User not Found"});
    }
}));