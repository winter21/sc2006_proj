const GymReview = require("../models/gymReview");

exports.createGymReview = async (req,res) => {
    var author = req.body.author;
    var date = req.body.date;
    var description = req.body.description;
    var rating = req.body.rating;
    var gym = req.body.gym;
    var gymReviewPictures = req.body.gymReviewPictures;
    try{
        const newGymReview = new GymReview({author, date, description, rating, gym, gymReviewPictures});
        await newGymReview.save();
        res.status(201).send("Gym review posted successfully");
    }catch(error){
        res.status(500).send(error.message);
    }
}

exports.getAllGymReviews = async (req, res) => {
    try {
        // Extract gymId from query parameters
        const gymId = req.query.gymId;
        if (!gymId) {
            return res.status(400).send("Gym ID is required");
        }

        const gymReviews = await GymReview.find({ gym: gymId });
        res.status(200).json(gymReviews);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getGymReview = async (req, res) => {
    try {
        const gymReview = await GymReview.findById(req.params.id);
        if (!gymReview) {
            return res.status(404).send("Gym review not found");
        }
        res.status(200).json(gymReview);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateGymReview = async (req, res) => {
    try {
        const updatedGymReview = await GymReview.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGymReview) {
            return res.status(404).send("Gym review not found");
        }
        res.status(200).json(updatedGymReview);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteGymReview = async (req, res) => {
    try {
        const gymReview = await GymReview.findByIdAndDelete(req.params.id);
        if (!gymReview) {
            return res.status(404).send("Gym review not found");
        }
        res.status(200).send("Gym review deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
