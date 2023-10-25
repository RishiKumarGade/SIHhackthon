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
        const {productId,quantity,location} = reqBody
        const user = await User.findOne({ClerkuserId:userId})
        const product = await Product.findOne({_id:productId})
        const store = await Store.findOne({_id:product.storeId})
        const totalPrice = product.price * quantity
        if (user._id == store.userId){
        return NextResponse.json({message:'You cannot Order Your own',success:true})
        }
        const newOrder = new Order({
            customerId:user._id,
            vendorId:store.userId,
            customerLocationLatitude:location.latitude,
            customerLocationLongitude:location.longitude,
            product:product._id,
            quantity:quantity,
            totalPrice:totalPrice,
            isAccepted:true,
        })
        await newOrder.save().then(async(savedOrder: any) =>{
            const newNotification = new Notification({
                userId:store.userId,
                message:'An Order has been recieved check orders'
            })
            await newNotification.save()
        })
        return NextResponse.json({message:'Order Placed and Notified to Vendor',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }
}