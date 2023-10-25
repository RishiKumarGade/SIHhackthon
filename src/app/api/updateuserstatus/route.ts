import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Store from '@/models/storeModel';
import Product from '@/models/productModel';
import { getAuth } from '@clerk/nextjs/server';
import User from '@/models/userModel';

connect()
export async function POST(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        const reqBody = await request.json()
        const {vendorStatus,transporterStatus} = reqBody
        const user = await User.findOne({ClerkuserId:userId})
        if(vendorStatus){
            user.isVendor = vendorStatus
        }
        if(transporterStatus){
            user.isTransporter = transporterStatus
        }
        await user.save()
        return NextResponse.json({message:'User Status Updated',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }
}