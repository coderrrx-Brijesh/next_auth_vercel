import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);
        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({ username, email, password:hashedPassword });
        const savedUser = await newUser.save();  
        
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});

        return NextResponse.json({ message: "User created successfully ",success:true,  user:savedUser }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}