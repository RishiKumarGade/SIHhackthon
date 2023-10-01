"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import MiniProduct from '@/components/MiniProduct'
import Product from '@/components/Product'

 
export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [filter,setFilter] = useState({category:'',name:''});
  const [products,setProducts] = useState([])
  const [activeProduct,setActiveProduct] = useState(null)

const GetProductsBySearch = async()=>{
    try {
        await axios.post('/api/getproductsbysearch',filter).then((res)=>{
            setProducts(res.data.data)
        })
    } catch (error) {
        console.log(error)
    }
}

const ActivateProduct = (id:any)=>{
    if (activeProduct == id){
        setActiveProduct(null)
    }else{
        setActiveProduct(id)
    }
}

  return (
    <>
    -------------------------------SEARCHPAGE---------------------------------
    <br />
    -----------QUERY--------------------
    <br />
        <input placeholder="category" type="text" value={filter.category} onChange={(e)=>{setFilter({...filter,category:e.target.value});GetProductsBySearch()}} />
        <input placeholder="name" type="text" value={filter.name} onChange={(e)=>{setFilter({...filter,name:e.target.value});GetProductsBySearch()}} />
    <br />
    -----------QUERY--------------------
    <br />
    -----------PRODUCTVIEW--------------------
    <br />
    {products.length>0 && 
        <>
            {products.map((product:any)=>{
                return (
                    <div key={product._id} onClick={(e)=>{e.preventDefault();ActivateProduct(product._id)}} >
                    {activeProduct == product._id ? 
                    <>
                        <Product product={product} />
                    </>
                    :
                    <>
                        <MiniProduct product={product} />
                    </>
                    } 
                    </div>
                )
            })}    
        </>
    }
    <br />
    -----------PRODUCTVIEW--------------------
    <br />

    -------------------------------SEARCHPAGE---------------------------------
    </>
  )
}