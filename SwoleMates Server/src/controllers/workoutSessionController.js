const WorkoutSession = require("../models/workoutSession");
const { findNearbyGyms } = require("../controllers/gymController");
const { findAllGyms } = require("../controllers/gymController");

// exports.createWorkoutSession = async (req,res) => {
//     var name = req.body.name;
//     var date = req.body.date;
//     var startTime = req.body.startTime;
//     var coordinates = req.body.coordinates;
//     var duration = req.body.duration;
//     var slots = req.body.slots;
//     var host = req.body.host;
//     try{
//         const newWorkoutSession = new WorkoutSession({name, date, startTime, coordinates, duration, slots, host});
//         await newWorkoutSession.save();
//         res.status(201).send("Workout Session created successfully");
//     }catch(error){
//         res.status(500).send("Failed to create Workout Session: " + error.message);
//     }
// }

//testing google maps api
exports.createWorkoutSession = async (req, res) => {
    const { name, date, coordinates, duration, slots, host } = req.body;

    try {
        if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
            return res.status(400).send("Invalid or missing coordinates");
        }

        const newWorkoutSession = new WorkoutSession({
            name, 
            date, 
            coordinates,
            duration, 
            slots, 
            host
        });

        await newWorkoutSession.save();
        res.status(201).send("Workout Session created successfully");
    } catch (error) {
        res.status(500).send("Failed to create Workout Session: " + error.message);
    }
};


exports.getAllWorkoutSessions = async (req, res) => {
    try {
        const workoutSessions = await WorkoutSession.find();
        res.status(200).json(workoutSessions);
    } catch (error) {
        res.status(500).send("Failed to retrieve Workout Sessions: " + error.message);
    }
};

exports.getWorkoutSession = async (req, res) => {
    try {
        const workoutSession = await WorkoutSession.findById(req.params.id);
        if (!workoutSession) {
            return res.status(404).send("Workout session not found");
        }
        res.status(200).json(workoutSession);
    } catch (error) {
        res.status(500).send("Error retrieving Workout Session: " + error.message);
    }
};

exports.updateWorkoutSession = async (req, res) => {
    try {
        const updatedWorkoutSession = await WorkoutSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorkoutSession) {
            return res.status(404).send("Workout session not found");
        }
        res.status(200).json(updatedWorkoutSession);
    } catch (error) {
        res.status(500).send("Failed to update Workout Session: " + error.message);
    }
};

exports.deleteWorkoutSession = async (req, res) => {
    try {
        const workoutSession = await WorkoutSession.findByIdAndDelete(req.params.id);
        if (!workoutSession) {
            return res.status(404).send("Workout session not found");
        }
        res.status(200).send("Workout session deleted successfully");
    } catch (error) {
        res.status(500).send("Failed to delete Workout Session: " + error.message);
    }
};
