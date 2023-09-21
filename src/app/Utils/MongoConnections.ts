import mongoose from "mongoose"

const MongoConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then((res) => {
        console.log("Mongodb connection successfully");
    }).catch((err) => {
        console.log("Mongodb connection error");
    })
}

export default MongoConnection