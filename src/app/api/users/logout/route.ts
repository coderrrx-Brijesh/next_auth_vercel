import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        console.log("Logout Success");
        const response = NextResponse.json({message:"Logout Success",success:true},{status:200});
        response.cookies.set("token","",{httpOnly:true,expires: new Date(0)});
        return response;
    }catch(error){
        console.log(error);
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({error: errorMessage}, {status:500});
    }
}