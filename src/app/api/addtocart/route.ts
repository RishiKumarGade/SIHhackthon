import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Store from '@/models/storeModel';
import Product from '@/models/productModel';
import User from '@/models/userModel';
import Cart from '@/models/cartModel';

import { getAuth } from '@clerk/nextjs/server';

connect()
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const { userId }:any = getAuth(request);
        const user = await User.findOne({ClerkuserId:userId}).select(['_id','stores']);
        const {productId,quantity} = reqBody
        const product = await Product.findOne({_id:productId})
        const cart = await Cart.findOne({userId:user._id})
        const item = {...product,quantity}
        cart.totalPrice = cart.totalPrice + quantity*product.price
        cart.item.push(item)
        await cart.save().then((storedCart:any)=>{
            console.log(storedCart)
        })
        return NextResponse.json({message:'cart Updated',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }
}     