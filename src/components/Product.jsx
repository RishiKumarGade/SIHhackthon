import Link from 'next/link'
import React from 'react'
import { UserButton , auth } from '@clerk/nextjs'

export default function Product(product) {
  return ( 
  <>
    <p> {product.product.productname}</p>
    <p> {product.product.category}</p>
  </> 
  )
}
