"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import MiniProduct from '@/components/MiniProduct'

 
export default function ProfilePage() {
  const [filter,setFilter] = useState('');
  const [searchMethod,setSearchMethod] = useState('NAME')
  const [products,setProducts] = useState([])
  const [activeProduct,setActiveProduct] = useState(null)

const GetProductsBySearch = async()=>{
    try {
        await axios.post('/api/getproductsbysearch',{filter,searchMethod}).then((res)=>{
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
    {
    (searchMethod == 'CATEGORY') && 
    <>
    <input placeholder="category" type="text" value={filter} onChange={(e)=>{setFilter(e.target.value);GetProductsBySearch()}} />
    </>
    }
    {(searchMethod == 'NAME') && <>
    <input placeholder="name" type="text" value={filter} onChange={(e)=>{setFilter(e.target.value);GetProductsBySearch()}} />
    </> 
    }
    <br />
    -----------QUERY--------------------
    <br />
    -----------PRODUCTVIEW--------------------
    <br />
    {products.length>0 && 
        <>
            {products.map((product:any)=>{
                return (
                    <Link key={product._id} href={`/checkout/${product._id}`}  >
                    <MiniProduct product={product} />
                    </Link>
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