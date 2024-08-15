import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sentEmail } from "@/helpers/mailer";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //Sent Verifiation Email
    const userId = savedUser._id;
    console.log(userId)
    await sentEmail({ email, emailType: "VERIFY", userId: userId });

    return NextResponse.json({
      message: "User Registered successfully",
      success: true,
      savedUser
    })


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
