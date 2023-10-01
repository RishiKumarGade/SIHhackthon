"use client";
import { useUser } from "@clerk/nextjs";
 
export default function HomePage() {
  const { isLoaded, isSignedIn, user }:any = useUser();
  return (
    <>
HOME PAGE
    </>

  ) ;
}