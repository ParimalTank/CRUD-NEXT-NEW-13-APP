import MongoConnection from "@/app/Utils/MongoConnections";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    await MongoConnection();

    try {
        const userData = await request.json();

        const updateUser = await User.findOneAndUpdate({ email: userData.email }, { firstname: userData.firstname, lastname: userData.lastname, email: userData.email, password: userData.password, maritalStatus: userData.maritalstatus }, {
            upsert: true,
            rawResult: true // Return the raw result from the MongoDB driver);
        });

        // Aggregation for min , max , avg or other methods to changes 

        // const useOfAggrigate = await User.aggregate([
        //     {
        //         $sort: { "firstname": 1 }       // 1 for accending order and -1 for decending order
        //     },
        //     {
        //         $limit: 5
        //     }
        // ])

        // const useOfAggrigate = await User.aggregate([
        //     {
        //         $project: {                    // It Gives the specific filed from the database 
        //             "firstname": 1,
        //             "email": 1,
        //             "password": 1
        //         }
        //     }
        // ])

        // const useOfAggrigate = await User.aggregate([
        //     { $match: { firstname: "August" } }         // Match the specific condition gives the result according that
        // ])

        // Aggrigate Function is Always give the output for the specific query they will not update into a real time database.
        // const useOfAggrigate = await User.aggregate([
        //     {
        //         $addFields: {
        //             lastname: "Hello",
        //         }

        //     },
        // ])

        // const useOfAggrigate = await User.aggregate([
        //     {
        //         $count: "id"         // count the total number of userss
        //     },
        // ])

        // $lookup: {                   // This is perform the left outer join.
        //     from: "movies",          // table name 
        //     localField: "movie_id",  // primary key
        //     foreignField: "_id",     // forain key from another table
        //     as: "movie_details",     // name of that filed or table
        //   },

        // const useOfAggrigate = await User.aggregate([
        //     {
        //         $count: "id"               // count the number of user by counting the id
        //     },
        // ])

        // The $out operation creates a new collection if one does not already exist.
        // The collection is not visible until the aggregation completes.

        console.log("updateUser: ", updateUser);

        if (updateUser) {
            return NextResponse.json({ message: "User Updated Successfully" }, { status: 200 })
        } else {
            return NextResponse.json({ message: "Faild" }, { status: 500 })
        }
    } catch (error) {
        return NextResponse.json({ message: "fAILS" }, { status: 500 })
    }
}