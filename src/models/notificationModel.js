import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    vendorId:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:true,
    },
    customerId:{
        type:String,
        required:[true,'please provide a username'],
    },
    cart:[
            {
                type:mongoose.Schema.ObjectId,
                ref:'products',
            }
        ],
})

const Notification = mongoose.models.notifications || mongoose.model('notifications',notificationSchema);

export default Notification;