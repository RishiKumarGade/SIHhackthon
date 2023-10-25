"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast";

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
        await axios.post('/api/createstore',storetocreate).then(()=>{
            toast.success('Store created successfully')
            GetAllStores()
        })
    } catch (error) {
        console.log(error)
    }
}

const DeleteStore = async(storeId:any)=>{
    try {
        await axios.post('/api/deletestore',{storeId}).then(()=>{
            toast.success('Store deleted successfully')
            GetAllStores()
        })
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
                
                <div key={store._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{store.storename}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{store.description}</p>
                    <Link href={`/profile/managestores/${store._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Manage
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        </Link>
                        <button onClick={(e)=>DeleteStore(store._id)} className="inline-flex items-center mx-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Delete Store
                        </button>
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