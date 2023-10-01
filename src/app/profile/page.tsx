"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
 
export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <>
    -------------------------------PROFILE---------------------------------
    <br />
    <Link href={"/profile/managestores"} >Manage Stores</Link>
    <br />
    -------------------------------PROFILE---------------------------------
    </>
  )
}