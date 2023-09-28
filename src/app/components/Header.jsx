import Link from 'next/link'
import React from 'react'
import { UserButton , auth } from '@clerk/nextjs'

export default function Header() {
  const {userId} = auth();
  return ( 
  <>
        <div>Clerk App</div>
        {!userId ?
          <>
            <Link href={'/signin'}>Sign In</Link><br />
            <Link href={'/signup'}>Sign up</Link><br />
          </>
        :
          <>
            <p>{userId}</p>
            <Link href={'/account'}>Account</Link>
            <Link href={'/profile'}>Profile</Link>
          </>
        }
        <br />
        <UserButton afterSignOutUrl='/' />
  </> 
  )
}
