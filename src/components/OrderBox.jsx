import React from 'react'
import axios from "axios";

export default function OrderBox(order) {

  const OrderResponseByVendor = async(order)=>{
    try {
      await axios.post('/api/orderresponsebyvendor',{order}).then(response =>{console.log(response)});
    } catch (error) {
      console.log(error)
    }
  }
  const OrderResponseByCustomer = async(order)=>{
    try {
      await axios.post('/api/orderresponsebycustomer',{order}).then(response =>{console.log(response)});
    } catch (error) {
      console.log(error)
    }
  }
  const OrderResponseByTransporter = async(order)=>{
    try {
      await axios.post('/api/orderresponsebytransporter',{order}).then(response =>{console.log(response)});
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    {order.order.transporterId === order.user._id && <>
      transporter
    <p>{order.order._id}</p>
    <button onClick={()=>{OrderResponseByTransporter(order.order)}} >Cancel Order</button>
    </>}
    {order.order.customerId === order.user._id && <>
    customer
    <p>{order.order._id}</p>
    <button onClick={()=>{OrderResponseByCustomer(order.order)}} >Cancel Order</button>
    
    </>}
    {(order.order.vendorId === order.user._id && order.order.isAccepted == true) && <>
      vendor
    <p>{order.order._id}</p>
    <button onClick={()=>{OrderResponseByVendor(order.order)}} >Cancel Order</button>
    </>}
    </>
  )
}
