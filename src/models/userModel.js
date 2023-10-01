import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    ClerkuserId:{
        type:String,
        required:true,
        unique:true,
    },
    contact:{
        type:String,
        required:true
    },
    username:{
        type:String,
        default:'user'
    },
    description:{
        type:String,
        default:'',
    },
    isTransporter:{
        type:Boolean,
        default:false,
    },
    isVendor:{
        type:Boolean,
        default:false,
    },
    stores:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'stores',
        }
    ],
    notifications:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'notifications',
        }
    ],
})

const User = mongoose.models.users || mongoose.model('users',userSchema);

export default User;