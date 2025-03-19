'use client'
import axios from 'axios'
import { set } from 'mongoose'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const profile = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const [id,setId] = React.useState(null);

    const signOut= async()=>{
        setLoading(true);
        try{
            const response = await axios.get("/api/users/logout")
            if(response.status === 200){
                console.log("Logout Success");
                toast.success("Logout Success");
                router.push("/login");
            }
        }catch(error:any){
            console.log(error.message);
            toast(error.message);
        }finally{setLoading(false);};
    }


    const getUserDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/users/me");
            if (response.status === 200) {
                console.log("User Details", response.data);
                setId(response.data.user._id);
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='flex flex-col gap-3 items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Loading..." : "Profile"}</h1>
        <hr />
        <p>Profile Page</p>
        {id && <Link href={`/profile/${id}`}>Go to {id}</Link>}
        <button
        onClick={() => getUserDetails()}
        className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Get User Details</button>
        <button
        onClick={() => signOut()}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Sign Out</button>
    </div>
  )
}

export default profile