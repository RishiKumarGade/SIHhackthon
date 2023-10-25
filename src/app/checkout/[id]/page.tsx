'use client';
import axios from "axios";
import { Key, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import MiniProduct from '@/components/MiniProduct'
import {toast} from "react-hot-toast";

export default function StorePage({ params }: { params: { id: Key } }) {

    const [product,setProduct]:any = useState(null);
    const [quantity,setQuantity] = useState(1)
    const [user,setUser] = useState(1)
    const [location,setLocation]:any = useState({latitude:0,longitude:0})


    const GetProductInfo = async()=>{
        try {
           await axios.post('/api/getproductinfo', {params}).then((res)=>{
                setProduct(res.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        GetProductInfo();
    })

 
  const setMyLocation = ()=>{
try {
  navigator.geolocation.getCurrentPosition((res)=>{
    setLocation({latitude:res.coords.latitude,longitude:res.coords.longitude})
  })
} catch (error) {
  console.log(error)
}
  }
  const PlaceOrder = async ()=>{
    try {
      if (location !=null){
        await axios.post('/api/placeorder',{productId:params.id,quantity:quantity,location:location}).then((res)=>{
          console.log(res)
          toast.success('order placed successfully')
        })
      }else{
        toast.error('please set your location')
      }
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <>
      {product !=null && <>
        <p> {product.productname}</p>
        <p> {product.category}</p>
        <input value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} placeholder='quantity' type="number"/>
        <button onClick={(e)=>{e.preventDefault();setMyLocation()}} >Update Location</button>
        {location.latitude != 0? <>
        <button onClick={(e)=>{e.preventDefault();PlaceOrder()}}  >Place Order</button>
        </> : <>
        <button onClick={(e)=>{e.preventDefault();PlaceOrder()}}  disabled>Place Order</button>
        </> }
      </>}
      </>

    )
  }