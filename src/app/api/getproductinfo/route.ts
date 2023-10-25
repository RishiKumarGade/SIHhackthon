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
        const reqBody = await request.json()
        const {params} = reqBody
        const product = await Product.findOne({_id:params.id})
        return NextResponse.json({
            message:'fetched product',
            data:product,
                })
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}
