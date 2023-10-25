import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    vendorId:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:true,
    },
    customerId:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:[true,'please provide a username'],
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'products',
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        default:1
    },
    vendorLocationLatitude:{
        type:Number,
    },
    vendorLocationLongitude:{
        type:Number,
    },
    customerLocationLatitude:{
        type:Number,
    },
    customerLocationLongitude:{
        type:Number,
    },
    transporterId:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
    },
    isAccepted:{
        type:Boolean,
        default:false
    }
})

const Order = mongoose.models.orders || mongoose.model('orders',orderSchema);

export default Order;