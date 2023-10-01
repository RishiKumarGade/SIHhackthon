"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'


export default function RegisterPage() {
  const { isLoaded, isSignedIn, user }:any = useUser();
  const router = useRouter();
  useEffect(() =>{
    if(isLoaded && isSignedIn){
      if(user?.unsafeMetadata.registered == false){
        try {
          axios.post('api/registeruser',{}).then((res)=>{
            console.log(res)
            router.push('/profile')
          })
        } catch (error) {
          console.log(error)
        }
        console.log('false')
      }
      else{
        router.push('/profile')
        console.log('true')
  
      }
    }
    
  })
  return (
    <>
    registering....
    </>

  ) ;
}