const express = require("express");
const router = express.Router();
const workoutSessionController = require('../controllers/workoutSessionController');

//POST method to create 1 new workout session
router.post("/create",workoutSessionController.createWorkoutSession);

//GET method to get all workout sessions
router.get("/",workoutSessionController.getAllWorkoutSessions);

//GET method to get one workout sessions
router.get("/:id",workoutSessionController.getWorkoutSession);

//Put method to update one workout session
router.put("/:id",workoutSessionController.updateWorkoutSession);

//DELETE method to delete one workout session
router.delete("/:id",workoutSessionController.deleteWorkoutSession);

module.exports = router;