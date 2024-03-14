const express = require("express");
const router = express.Router();
const workoutSessionController = require('../controllers/workoutSessionController');

//POST method to create 1 new workout session
router.post("/create",workoutSessionController.createWorkoutSession);
//GET method to get all workout sessions

//GET method to get one workout sessions

//PATCH method to update one workout session

//DELETE method to delete one workout session


module.exports = router;