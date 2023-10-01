import mongoose from 'mongoose';
import districts from '../enums/districtEnum'

const storeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    district:{
        type:String,
        enum:districts,
        required:true
    },
    storename:{
        type:String,
        required:[true,'please provide a name'],
    },
    description:{
        type:String,
        default:'',
    },
    products:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'products',
        }
    ],
})

const Store = mongoose.models.stores || mongoose.model('stores',storeSchema);

export default Store;