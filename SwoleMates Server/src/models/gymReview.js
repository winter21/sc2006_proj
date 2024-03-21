const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gymReviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required : [true, "Author cannot be empty"]
    },

    date: {
        type: Date,
        required: [true, "Date cannot be empty"],
        default: Date.now
    },
    description: {
        type: String,
        required: [true, "Review cannot be empty"]
    },

    rating: {
        type: Number,
        required: [true, "Ratings cannot be empty"],
        min: 1,
        max: 5,
    },
    gym:{
        type: Schema.Types.ObjectId,
        ref: "Gym",
        required: [true, "Gym cannot be empty"]
    },
    gymReviewPictures: {
        type: String, 
        required: false 
    }

})

module.exports = mongoose.model("GymReview", gymReviewSchema);