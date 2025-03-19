"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import axios from "axios"
import toast from "react-hot-toast"

const LogIn = () => {

  const router = useRouter();
  const [user,setUser] = React.useState({
    email: "",
    password: ""  
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onLogIn = async () => {
    setLoading(true);
    try{
      const response = await axios.post("/api/users/login", user)
      if(response.status === 200){
      console.log("Login Success", response.data);
      toast.success("Login Success");
      router.push("/profile");}
    }catch(error:any){
      console.log("Login failed", error);
      toast.error("Login failed");
    }finally{
      setLoading(false);
    }
    
  }

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center p-4">
        <h1>{loading ? "Loading..." : "Log In"}</h1>
      <div className="flex h-full w-full gap-2 flex-col justify-center items-center">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" className="bg-amber-50 text-black  rounded-b-sm p-1 w-1/4" placeholder="Email" onChange={(e) => setUser({...user, email: e.target.value})} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" className="bg-amber-50 text-black rounded-b-sm p-1 w-1/4" placeholder="Password" onChange={(e) => setUser({...user, password: e.target.value})} />
      <button className="bg-gray-800 p-2 rounded-sm mt-10" onClick={onLogIn}>Log In</button>
      </div>
      <Link href={"/signup"}>SignUp Here</Link>
    </div>
  )
}

export default LogIn