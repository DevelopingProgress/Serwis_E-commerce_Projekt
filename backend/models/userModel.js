import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true},
    acceptedRules: {type: Boolean, default: false, required: true},
    isAdmin: {type: Boolean, default: false, required: true},
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;