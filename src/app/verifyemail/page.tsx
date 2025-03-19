"use client"
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
 
const verifyEmail = () => {
    const [token, setToken] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [error, setError] = React.useState("");
    const verifyUser = async () => {
        try{
            const response = await axios.post("/api/users/verifyemail",{token});
            if(response.status === 200){
                console.log("Email Verified Successfully");
                toast.success("Email Verified Successfully");
                setVerified(true);
            }else{
                console.log("Email Verification Failed");
                toast.error("Email Verification Failed");}
            }catch(error:any){
                setError(error.message);
                console.log(error);
        }
    }

    useEffect(()=>{
        setToken(window.location.search.split("=")[1] || "");
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyUser();
        }
    },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Verify Email</h1>
        <h2>{token ? token : "No Token"}</h2>
        {verified ? (
            <div>
                <h2>Email Verified Successfully</h2>
                <Link href="/login">Login</Link>
            </div>
        ):(
            <div>
                <h2>Email Not Verified</h2>
                <p>{error}</p>
            </div>
        )}
    </div>
  )
}

export default verifyEmail