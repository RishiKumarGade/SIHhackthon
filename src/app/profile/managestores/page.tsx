"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
 
export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [stores,setStores] = useState([]);
  const [storetocreate,setStoreToCreate] = useState({storename:"",description:''});

// -----------------------FUNCTIONS-----------------------------------------

  const GetAllStores = async ()=>{
    try {
        await axios.get('/api/getstores').then((res)=>{
            setStores(res.data.data)
        })
        
    } catch (error) {
        console.log(error)
    }
  }

const CreateStore = async()=>{
    try {
        const res = await axios.post('/api/createstore',storetocreate)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}


// -----------------------FUNCTIONS-----------------------------------------


useEffect(()=>{
    GetAllStores()
},[])

  return (
    <>
    --------------------------STORES--------------------------------------
    <br />
    ----------VIEWSTORES------------
    <br />

    {stores.length !=0  &&
    <>
    
        {stores.map((store:any)=>{
            return(
            <div key={store._id}>
                <Link href={`/profile/managestores/${store._id}`}><p>{store.storename}</p></Link>
            </div>
            )
        })}
    </>
    }

    <br />
    ----------VIEWSTORES------------
    <br />
    -----------ADDSTORES-------------
<br />

    <div>
        <input type="text" placeholder="store name" onChange={(e)=>setStoreToCreate({...storetocreate,storename:e.target.value})} value={storetocreate.storename} />
        <input type="text" placeholder="store desc" onChange={(e)=>setStoreToCreate({...storetocreate,description:e.target.value})} value={storetocreate.description} />
        <button onClick={(e)=>{e.preventDefault();CreateStore()}} >Create Store</button>
    </div>

<br />
    -----------ADDSTORES-------------



    <br />
    --------------------------STORES--------------------------------------
    </>
  )
}