import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Store from '@/models/storeModel';
import User from '@/models/userModel';

import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import Product from '@/models/productModel';
import Order from '@/models/orderModel';

connect()

export async function POST(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        const reqBody = await request.json()
        const {productId} = reqBody
        const order = await Order.find({product:productId})
        if(order.length > 0)
        {
            return NextResponse.json({
                message:'Product is in an order ,Cancel the order to delete it',
                success:true,
                })
        }
        else{
            await Product.deleteOne({_id:productId})
            return NextResponse.json({
                message:'Deleted Product',
                success:true,
                })
        }
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}
