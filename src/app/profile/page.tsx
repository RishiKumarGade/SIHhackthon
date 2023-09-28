"use client";
import { useUser } from "@clerk/nextjs";
 
export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  return <>
  {user&&
  <>
      {user.primaryPhoneNumber?.phoneNumber}
  </>
  }
  </>
}