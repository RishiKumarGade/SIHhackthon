import mongoose from 'mongoose';

const completedOrderSchema = new mongoose.Schema({
    TransporterId:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:true,
    },
    orderId:{
        type:mongoose.Schema.ObjectId,
        ref:'orders',
        required:true,
    },
    
})

const CompletedOrder = mongoose.models.completedOrders || mongoose.model('completedOrders',completedOrderSchema);

export default CompletedOrder;