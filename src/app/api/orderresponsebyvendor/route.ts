import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Order from '@/models/orderModel';
import Notification from '@/models/notificationModel';

connect()
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {order} = reqBody
            await Order.findOneAndDelete({_id:order._id}).then(async(savedOrder: any) =>{
                let newNotification = new Notification({
                    userId:savedOrder.customerId,
                    message:'your Order has been cancelled by vendor',
                })
                await newNotification.save();
                if(savedOrder.transporterId !=null){
                    newNotification = new Notification({
                        userId:savedOrder.transporterId,
                        message:'your Order has been cancelled by vendor, you dont have to transport',
                    })
                    await newNotification.save();
                }
            })
            return NextResponse.json({message:'Order Has Been Deleted',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }
}