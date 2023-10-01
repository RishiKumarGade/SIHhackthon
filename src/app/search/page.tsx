"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
 
export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [filter,setFilter] = useState({category:'',name:''});
  const [products,setProducts] = useState([])

const GetProductsBySearch = async()=>{
    try {
        await axios.post('/api/getproductsbysearch',filter).then((res)=>{
            setProducts(res.data.data)
        })
    } catch (error) {
        console.log(error)
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
                    <div key={product._id} >
                        <p> {product.productname}</p>
                        <p> {product.category}</p>
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