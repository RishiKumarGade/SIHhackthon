import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/userModel';
import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';

connect()

export async function GET(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        let user;
        try {
        user = await User.findOne({ClerkuserId:userId}).select('stores').populate('stores');
        } catch (error) {
        user = await User.findOne({ClerkuserId:userId}).select('stores');
        }
        return NextResponse.json({
            message:'fetched stores',
            data:user.stores,
                })
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}
