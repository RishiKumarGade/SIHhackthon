import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import User from '@/models/userModel';
import { getAuth } from '@clerk/nextjs/server';
import Notification from '@/models/notificationModel';
import Store from '@/models/storeModel';


connect()

export async function GET(request:NextRequest){
    try {
        const { userId }:any = getAuth(request);
        const user = await User.findOne({ClerkuserId:userId})
        let notifications;
        if(user.isTransporter ){
        notifications = await Notification.find({$or:[{userId:user._id}, {userId:null}]})
        }else{
        notifications = await Notification.find({userId:user._id})
        }
        return NextResponse.json({
            message:'fetched notiications',
            data:{user:user,notifications:notifications},
        })
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}
