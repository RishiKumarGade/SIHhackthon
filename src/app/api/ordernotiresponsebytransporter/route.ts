import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import User from '@/models/userModel';
import Order from '@/models/orderModel';
import Product from '@/models/productModel';
import Store from '@/models/storeModel';
import Notification from '@/models/notificationModel';



connect()
export async function POST(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        const reqBody = await request.json();
        const {status,not} = reqBody
        const user = await User.findOne({ClerkuserId:userId})
        await Notification.findOneAndDelete({_id:not._id})
        let order;
         order = await Order.findOne({_id:not.orderId})
         order.transporterId = user._id
         await order.save().then(async(savedOrder: any) =>{
             const newNotification = new Notification({
                 orderId:savedOrder._id,
                 message:'Order has been Accepted By Transporter',
                 Notifytype:'PRIVATEORDERACCEPTEDBYTRANSPORTER'
             })
             await newNotification.save();
         })
        return NextResponse.json({message:'Order Accepted By transporter',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }
}