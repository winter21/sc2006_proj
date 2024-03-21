const express = require("express");
const router = express.Router();
const gymReviewController = require('../controllers/gymReviewController');

//POST method to create 1 new review
router.post("/create",gymReviewController.createGymReview);

//GET method to get all reviews of a gym
router.get("/",gymReviewController.getAllGymReviews);

//GET method to get one review
router.get("/:id",gymReviewController.getGymReview);

//Put method to update one review
router.put("/:id",gymReviewController.updateGymReview);

//DELETE method to delete one review
router.delete("/:id",gymReviewController.deleteGymReview);

module.exports = router;