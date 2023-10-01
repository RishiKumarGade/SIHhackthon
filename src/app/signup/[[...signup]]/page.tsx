import React from 'react'
import { SignUp } from '@clerk/nextjs/app-beta'

export default function SigninPage() {
  return (
    <>
    <SignUp unsafeMetadata={{registered:false}} />
    </>
  )
}
  