import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/userModel';
import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';

connect()


export async function POST(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        const user = await User.findOne({ClerkuserId:userId})
        if (!user) {
        const user:any =  await clerkClient.users.getUser(userId)
        const newUser = new User({
            ClerkuserId:userId,
            contact:user.phoneNumbers[0].phoneNumber
        })
        await newUser.save().then(()=>{
            user.unsafeMetadata.registered == true
        })
        return NextResponse.json({message:'user created',success:true})
    }
    return NextResponse.json({message:'user Already Exists',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}

// please do not change this *crying emoji*