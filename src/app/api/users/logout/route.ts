import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";;

connect();

export async function POST(request: NextRequest) {
    try {

        const response = NextResponse.json({ message: "logout successfully" }, { status: 200 });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    };
};