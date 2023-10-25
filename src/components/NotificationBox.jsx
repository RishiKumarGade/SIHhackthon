import React, { useEffect } from 'react'
import axios from "axios";

export default function NotificationBox(notification) {

  const OrderResponseByTransporter = async(status,not) =>{
    try {
       await axios.post('/api/ordernotiresponsebytransporter',{status,not}).then(response =>{console.log(response)});
    } catch (error) {
      console.log(error)
    }
  }
  return ( 
  <>
    <p>{notification.notification.message}</p>
       {notification.notification.userId}
       
  </> 
  )
}
