"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const SignUp = () => {

  const router =useRouter();

  const [user,setUser] = React.useState({
      email:"",
      password:"",
      username:""
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    setLoading(true);
      try{
          const response = await axios.post("/api/users/signup", user);
          console.log("Signup Success", response.data);
          router.push("/login");
          toast.success("Signup Success");
      }catch(error){
        console.log("Signup failed", error);
        toast.error("Signup failed");
      }finally{
        setLoading(false);
      }
  }

  useEffect(()=>{
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
          setButtonDisabled(false);
      } else{
          setButtonDisabled(true);
      }
  },[user])

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center p-4">
        <h1>{loading ? "Processing....":"Sign Up"}</h1>
      <div className="flex h-full w-full gap-2 flex-col justify-center items-center">
        <label htmlFor="username">Username</label> 
        <input type="text" name="username" id="username" className="font-black bg-amber-50 text-black rounded-b-sm p-1 w-1/4" 
        onChange={(e) => setUser({...user, username: e.target.value})} placeholder="Username"/>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" className="font-black bg-amber-50 text-black  rounded-b-sm p-1 w-1/4" placeholder="Email" onChange={(e) => setUser({...user, email: e.target.value})} />
        
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" className="font-black bg-amber-50 text-black rounded-b-sm p-1 w-1/4" placeholder="Password" onChange={(e) => setUser({...user, password: e.target.value})} />
      <button disabled={buttonDisabled} className="bg-gray-800 p-2 rounded-sm mt-10" onClick={onSignup}>
          SignUp
        </button>
      </div>
      <Link href={"/login"}>LogIn here</Link>
    </div>
  )
}

export default SignUp