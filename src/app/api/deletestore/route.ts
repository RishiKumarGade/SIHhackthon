import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Store from '@/models/storeModel';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {storeId} = reqBody
        const store =  await Store.findOne({_id:storeId})
        if(store.products.length > 0)
        {
            return NextResponse.json({
                message:'Store Has Existing Products,Delete The Products First',
                success:true,
                })
        }
        else{
            await Store.deleteOne({_id:storeId})
            return NextResponse.json({
                message:'Deleted store',
                success:true,
                })
        }
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})
    }
}
