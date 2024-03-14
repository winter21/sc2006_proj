const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSessionSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"]
    },
    date: {
        type: Date,
        required: [true, "Date cannot be empty"]
    },
    startTime: {
        type: String,
        required: [true, "Start time cannot be empty"]
    },
    coordinates: {
        longtitude:{
            type: Number,
            required: [true, "Longtitude cannot be empty"]
        },
        latitude:{
            type: Number,
            required: [true, "Latitude cannot be empty"]
        }
    },
    duration: {
        type: Number,
        required: [true, "Duration cannot be empty"]
    },
    slots: {
        type: Number,
        required: [true, "Slots cannot be empty"]
    },
    participants_id:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    host:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Host cannot be empty"]
    }

})

module.exports = mongoose.model("WorkoutSession", workoutSessionSchema);