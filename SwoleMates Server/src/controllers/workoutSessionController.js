const WorkoutSession = require("../models/workoutSession");
const axios = require('axios');


exports.createWorkoutSession = async (req, res) => {
    const { name, date, address, duration, slots, host, interest } = req.body;

    try {
        if (!address) {
            return res.status(400).send("Address is required");
        }

        // Call Google Geocoding API to convert address to coordinates
        const googleMapsApiKey = 'AIzaSyDKEBSYBdvZtuTcN7Lx8Mg6RTBaGtPCOQY'; 
        const googleGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;
        
        const geocodeResponse = await axios.get(googleGeocodeUrl);
        if (geocodeResponse.data.status !== 'OK' || !geocodeResponse.data.results[0]) {
            return res.status(404).send("Address not found");
        }

        const coordinates = geocodeResponse.data.results[0].geometry.location;

        // Create a new WorkoutSession with the obtained coordinates
        const newWorkoutSession = new WorkoutSession({
            name, 
            date,
            coordinates: { 
                latitude: coordinates.lat,
                longitude: coordinates.lng
            },
            duration, 
            slots, 
            host,
            interest
        });

        await newWorkoutSession.save();
        res.status(201).send("Workout Session created successfully");
    } catch (error) {
        console.error('Failed to create Workout Session:', error);
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
