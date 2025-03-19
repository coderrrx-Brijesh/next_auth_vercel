import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

connectDB()

export async function POST(request:NextRequest){
    try{
        const reqBoy = await request.json()
        const {token} = reqBoy
        console.log(token);
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        if(!user) {
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()
        console.log("User verified successfully!")
        return NextResponse.json({message:"Email Verified Successfully"},{status:200})

    }catch(error:any){
        console.log(error);
        return NextResponse.json({error:error.message},{status:500})
    }
}