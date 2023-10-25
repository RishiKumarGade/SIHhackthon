"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import NotificationBox from '@/components/NotificationBox';
import OrderBox from '@/components/OrderBox';
import {toast} from "react-hot-toast";


export default function ProfilePage() {
  
  const { isLoaded, isSignedIn, user } = useUser();
  const [notifications,setNotifications]:any = useState([]);
  const [mongoUser,setMongoUser]:any = useState(null);
  const [orders,setOrders]:any = useState([]);

  

  const GetNotifications = async()=>{
    try {
      await axios.get('/api/getnotifications').then(response =>{setMongoUser(response.data.data.user);setNotifications(response.data.data.notifications)});
    } catch (error) {
      console.log(error)
    }
  }

  const GetOrders = async()=>{
    try {
      await axios.get('/api/getorders').then(response=>{setOrders(response.data.data)});
    } catch (error) {
      console.log(error)
    }
  }

  const UpdateUserStatus = async(vendorStatus:boolean,transporterStatus:boolean)=>{
    try {
      await axios.post('/api/updateuserstatus',{vendorStatus:vendorStatus,transporterStatus:transporterStatus}).then(response =>{console.log(response);location.reload();toast.success(vendorStatus? 'You are now A Vendor':'You are now a transporter')});
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    GetNotifications();
    GetOrders();
  },[])

  return (
    <>
    { mongoUser != null && <> -------------------------------PROFILE---------------------------------
    <br />
    {mongoUser.isVendor ? <>
    <Link href={"/profile/managestores"} >Manage Stores</Link>
    </> :<>
    <button onClick={(e)=>{UpdateUserStatus(true,false)}} >Become A Vendor</button>
    </> }
    <br />
    {mongoUser.isTransporter ? <>you are a transporter
    </> :<>
    <button onClick={(e)=>{UpdateUserStatus(false,true)}}>Become A Transporter</button>
    </> }
    <br />
    -------------------------------PROFILE--------------------------------- <br />
    -------------------------------ORDERS--------------------------------- <br />
    {orders.map((order:any) =>{
      return (
        <div key={order._id}>
        <OrderBox order={...order} user={...mongoUser}/>
        </div>
    )
    })}
    <br />
    -------------------------------ORDERS---------------------------------
    <br />
    {notifications.length != 0 && <>-------------------------------NOTIFICATIONS---------------------------------
    <br />
    {notifications.map((notification:any) =>{
      return (
        <div key={notification._id}>
        <NotificationBox notification={...notification} user={...mongoUser}/>
        </div>
    )
    })}
    -------------------------------NOTIFICATIONS--------------------------------- </>} </> }
    </>
  )
}