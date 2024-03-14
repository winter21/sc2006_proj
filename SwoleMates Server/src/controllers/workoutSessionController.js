const WorkoutSession = require("../models/workoutSession");

exports.createWorkoutSession = async (req,res) => {
    var name = req.body.name;
    var date = req.body.date;
    var startTime = req.body.startTime;
    var coordinates = req.body.coordinates;
    var duration = req.body.duration;
    var slots = req.body.slots;
    var host = req.body.host;
    try{
        const newWorkoutSession = new WorkoutSession({name, date, startTime, coordinates, duration, slots, host});
        await newWorkoutSession.save();
        res.status(201).send("Workout Session created successfully");
    }catch(error){
        res.status(500).send(error.message);
    }
}

