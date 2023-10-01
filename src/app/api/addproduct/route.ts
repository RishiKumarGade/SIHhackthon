import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Store from '@/models/storeModel';
import Product from '@/models/productModel';

connect()
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {storeid,name,description,price,imageurl,category} = reqBody
        const store = await Store.findOne({_id:storeid})
        const newProduct = new Product({productname:name,description:description,price:price,imageUrl:imageurl,category:category ,storeId:storeid})
        const savedProduct = await newProduct.save()
        store.products.push(savedProduct)
        await store.save()
        return NextResponse.json({message:'Product created',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }
}