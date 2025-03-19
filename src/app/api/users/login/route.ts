import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest){
    const reqBody = await request.json();
    const {email,password} = reqBody;
    if(!email || !password){
        return NextResponse.json({error:"Email and Password are required"},{status:400});
    }
    const user = await User.findOne({email});
    if(!user){
        console.log("User does not exist");
        return NextResponse.json({error:"User does not exist"},{status:400});
    }
    const validPassword = await bcryptjs.compare(password,user.password);
    if(!validPassword){
        console.log("Invalid Password");
        return NextResponse.json({error:"Invalid Password"},{status:400});
    }
    if(!user.isVerified){
        console.log("User is not verified");
        return NextResponse.json({error:"User is not verified"},{status:400});
    }
    // token generation and store in cookies
    const tokenData = {
        id:user._id,
        username:user.username,
        email:user.email
    }
    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});
    
    const response= NextResponse.json({
        message:"User logged in successfully",
        success:true
    },{status:200});

    response.cookies.set({
        name:"token",
        value:token,
        httpOnly:true
    });
    console.log("User logged in successfully ",response );
    return response
}