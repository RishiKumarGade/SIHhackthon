import mongoose from 'mongoose';
import districts from '../enums/districtEnum'

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        unique:true,
    },
    products:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'products',
        }
    ],
    totalPrice:{
        type:Number,
        required:true
    },
})
const Cart = mongoose.models.carts || mongoose.model('carts',cartSchema);

export default Cart;