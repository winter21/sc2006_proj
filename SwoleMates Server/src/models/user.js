const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
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
        type: [String],
        enum: [
            "Weightlifting",
            "Running",
            "Yoga",
            "Cycling",
            "Swimming",
            "HIIT",
            "Pilates",
            "Boxing",
            "CrossFit",
            "Dance",
            "Hiking",
            "Rowing",
          ]
    }
})

module.exports = mongoose.model("User", UserSchema);