import mongoose from 'mongoose';


const notificationSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'orders',
    },
    timestamp: {
        type: Date,
        default: Date.now()
      },
})

const Notification = mongoose.models.notifications || mongoose.model('notifications',notificationSchema);

export default Notification;