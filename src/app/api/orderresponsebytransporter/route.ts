import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import User from '@/models/userModel';
import Order from '@/models/orderModel';
import Notification from '@/models/notificationModel';

connect()
export async function POST(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        const reqBody = await request.json();
        const {order} = reqBody
         const i = await Order.findOne({_id:order._id})
         i.transporterId = null
         await i.save().then(async(savedOrder: any) =>{
             let newNotification = new Notification({
                 userId:savedOrder.customerId,
                 message:'an Order will be delivered by a new transporter',
             })
             await newNotification.save();
             newNotification = new Notification({
                userId:savedOrder.vendorId,
                message:'transporter cancelled the delivery ,you will be notified when another transporter accepts the order',
            })
            await newNotification.save();
         })
        return NextResponse.json({message:'Order cancelled by transporter',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }
}