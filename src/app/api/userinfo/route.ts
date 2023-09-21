import MongoConnection from "@/app/Utils/MongoConnections";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await MongoConnection();

    try {
        const userData = await User.find({});

        return NextResponse.json({ user: userData }, { status: 200 })
    } catch (err) {
        console.log("err: ", err);
        return NextResponse.json({ message: "Users Not Found" }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    await MongoConnection();

    try {
        const userId = await request.json();
        console.log("userId: ", userId);

        const deleteUser = await User.findByIdAndDelete({ _id: userId.id });

        if (deleteUser) {
            return NextResponse.json({ message: "User Deleted Successfully" }, { status: 200 })
        } else {
            return NextResponse.json({ message: "Faild" }, { status: 500 })
        }
    } catch (error) {
        return NextResponse.json({ message: "fAILS" }, { status: 500 })
    }
}
