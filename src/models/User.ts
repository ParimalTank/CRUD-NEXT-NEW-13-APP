import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String
    },
    hobby: [{
        type: String
    }]
},
    {
        timestamps: true,
        versionKey: false,
    })

export default mongoose.models.User || mongoose.model("User", userSchema);