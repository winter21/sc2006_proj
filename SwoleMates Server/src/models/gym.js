const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gymSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"]
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
    gymPictures: {
        type: String,
        required: [true, "Pictures cannot be empty"]
    },
    reviews: {
        type: Schema.Types.ObjectId,
        ref: "GymReview"
    }

})

module.exports = mongoose.model("Gym", gymSchema);