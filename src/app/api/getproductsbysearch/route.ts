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
        const {filter,searchMethod} = reqBody
        let products;
        if(searchMethod == 'CATEGORY'){
            products = await Product.find({ category: { $regex: filter,$options: 'xi' }})
        }
        if(searchMethod == 'NAME'){
            products = await Product.find({productname: { $regex: filter,$options: 'xi'}})
        }
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
