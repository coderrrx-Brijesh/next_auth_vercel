import { connectDB } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenData(request);
        const foundedUser = await User.findById({_id: userId}).select("-password");
        return NextResponse.json({ message:"user found", user:foundedUser }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
