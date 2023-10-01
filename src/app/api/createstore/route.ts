import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Store from '@/models/storeModel';
import User from '@/models/userModel';

import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';

connect()

export async function POST(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        const user = await User.findOne({ClerkuserId:userId}).select(['_id','stores']);
        const reqBody = await request.json()
        const {storename,description} = reqBody
        const newStore = new Store({
            storename:storename,description:description,district:'ANANTNAG',userId:user._id
        })
        const savedStore = await newStore.save()
        user.stores.push(savedStore._id) 
        await user.save()
        return NextResponse.json({
            message:'Created store',
            success:true,
            })
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}
