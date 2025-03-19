"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  const signOut = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users/logout");
      if (response.status === 200) {
        console.log("Logout Success");
        toast.success("Logout Success");
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users/me");
      if (response.status === 200) {
        console.log("User Details", response.data);
        setId(response.data.user._id);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading..." : "Profile"}</h1>
      <hr />
      <p>Profile Page</p>
      {id && <Link href={`/profile/${id}`}>Go to {id}</Link>}
      <button
        onClick={() => getUserDetails()}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
      <button
        onClick={() => signOut()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
