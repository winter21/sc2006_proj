const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: [true, "Username cannot be empty"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty"]
    },
    user: {
        email: {
            type: String,
            unique: true,
            required: [true, "Email cannot be empty"]
        },
        name: {
            type: String,
            require: [true, "Name cannot be empty"]
        },
        gender: {
            type: String,
            enum: ["MALE", "FEMALE", "PREFER NOT TO SAY"]
        },
        aboutMe: {
            type: String
        },
        profilePicture: {
            type: String
        },
        interest: {
            type: String,
            enum: ["POWERLIFTING", "CARDIO TRAINING", "YOGA", "HITT", "LINE DANCING", "RUNNING"]
        }
    }

})

module.exports = mongoose.model("Account", AccountSchema);