import mongoose from 'mongoose';
import districts from '../enums/districtEnum'

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        unique:true,
    },
    item:[{
        product:{
                type:mongoose.Schema.ObjectId,
                ref:'products',
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    totalPrice:{
        type:Number,
        default:0,
    },
})
const Cart = mongoose.models.carts || mongoose.model('carts',cartSchema);

export default Cart;