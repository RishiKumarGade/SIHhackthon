import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/userModel';
import { getAuth } from '@clerk/nextjs/server';
import Notification from '@/models/notificationModel';
import Order from '@/models/orderModel';


connect()

export async function GET(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        const user = await User.findOne({ClerkuserId:userId});
        const orders = await Order.find({$or:[{transporterId:user._id},{vendorId:user._id},{customerId:user._id},]})
        return NextResponse.json({
            message:'fetched orders',
            data:orders
        })
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}
