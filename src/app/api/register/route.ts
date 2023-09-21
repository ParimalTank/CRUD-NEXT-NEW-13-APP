import MongoConnection from "@/app/Utils/MongoConnections";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

    await MongoConnection();

    try {
        const userData = await request.json();
        console.log("userData: ", userData);

        const email = await User.exists({ email: userData.data.email });
        console.log("email: ", email);

        if (email) {
            return NextResponse.json({ message: "User is Already Exist" }, { status: 409 })
        } else {

            const user = {
                firstname: userData.data.firstname,
                lastname: userData.data.lastname,
                password: userData.data.password,
                maritalstatus: userData.data.maritalstatus,
                email: userData.data.email,
                hobby: userData.userinfo.hobby
            }

            const result = await User.create(user);

            return NextResponse.json({ message: "successfully registered" }, { status: 200 })
        }
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({ message: "Fails" }, { status: 500 })
    }
}