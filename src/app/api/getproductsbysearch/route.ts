import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/userModel';
import Product from '@/models/productModel';
import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import Store from '@/models/storeModel';

connect()

export async function POST(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        const reqBody = await request.json()
        const {category,name} = reqBody

        const products = await Product.find({ category: { $regex: category }, productname: { $regex: name+' '}})
        return NextResponse.json({
            message:'fetched products',
            data:products,
                })
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}
