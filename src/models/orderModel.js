import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    vendorId:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:true,
    },
    customerId:{
        type:String,
        required:[true,'please provide a username'],
    },
    cart:{
        type:mongoose.Schema.ObjectId,
        ref:'carts',
    },
    vendorLocationLatitude:{
        type:Number,
        required:true
    },
    vendorLocationLongitude:{
        type:Number,
        required:true
    },
    customerLocationLatitude:{
        type:Number,
        required:true
    },
    customerLocationLongitude:{
        type:Number,
        required:true
    },
})

const Order = mongoose.models.orders || mongoose.model('orders',orderSchema);

export default Order;