import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Store from '@/models/storeModel';
import { clerkClient } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {storeid} = reqBody
        let store
        try {
        store = await Store.findOne({_id:storeid}).populate('products');
        } catch (error) {
        store = await Store.findOne({_id:storeid})
        }
        return NextResponse.json({
            message:'fetched store',
            data:store,
                })
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}
