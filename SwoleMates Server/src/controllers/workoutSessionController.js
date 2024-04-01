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
            address,
            coordinates: { 
                latitude: coordinates.lat,
                longitude: coordinates.lng
            },
            duration, 
            slots, 
            host,
            interest,
            on: true
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

// exports.deleteWorkoutSession = async (req, res) => {
//     try {
//         const workoutSession = await WorkoutSession.findByIdAndDelete(req.params.id);
//         if (!workoutSession) {
//             return res.status(404).send("Workout session not found");
//         }
//         res.status(200).send("Workout session deleted successfully");
//     } catch (error) {
//         res.status(500).send("Failed to delete Workout Session: " + error.message);
//     }
// };

exports.deleteWorkoutSession = async (req, res) => {
    try {
        setTimeout(async () => {
            try {
                const workoutSession = await WorkoutSession.findByIdAndDelete(req.params.id);
                if (workoutSession) {
                    console.log(`Workout session ${req.params.id} deleted successfully after 5 minutes`);
                } else {
                    console.log(`Workout session ${req.params.id} not found for deletion`);
                }
            } catch (error) {
                console.error(`Failed to delete Workout Session: ${error.message}`);
            }
        }, 300000); // delete after 5mins. 1000=1s. 

        res.status(200).send("Workout session deleted");
    } catch (error) {
        res.status(500).send("Failed to delete Workout Session: " + error.message);
    }
}


exports.joinWorkoutSession = async (req, res) => {
    const workoutSessionId = req.params.id;
    const userId = req.body.userId;

    try {
        const workoutSession = await WorkoutSession.findById(workoutSessionId);

        if (!workoutSession) {
            return res.status(404).send("Workout session not found");
        }

        if (workoutSession.participants.includes(userId)) {
            return res.status(400).send("You already joined the workout session");
        }

        workoutSession.participants.push(userId);

        await workoutSession.save();

        res.status(200).send("You have successfully joined the workout session");
    } catch (error) {
        console.error('Error joining workout session:', error);
        res.status(500).send("Error joining workout session: " + error.message);
    }
};


exports.leaveWorkoutSession = async (req, res) => {
    const sessionId = req.params.id; 
    const userId = req.body.userId; 

    try {
        const updatedSession = await WorkoutSession.findByIdAndUpdate(
            sessionId,
            { $pull: { participants: userId } },
            { new: true } 
        );

        if (!updatedSession) {
            return res.status(404).send("Workout session not found");
        }

        res.status(200).send({
            message: "You have successfully left the workout session",
            updatedSession
        });
    } catch (error) {
        res.status(500).send("Failed to leave Workout Session: " + error.message);
    }
};

exports.getUserWorkoutSessions = async (req, res) => {
    try {
        // Assuming userId is passed as a query parameter
        // i.e., /workoutsessions?userId=xxx
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).send("UserId is required");
        }

        const workoutSessions = await WorkoutSession.find({
            $or: [
                { host: userId },
                { participants: userId }
            ]
        });

        res.status(200).json(workoutSessions);
    } catch (error) {
        console.error('Failed to retrieve Workout Sessions:', error);
        res.status(500).send("Failed to retrieve Workout Sessions: " + error.message);
    }
};

exports.getHostWorkoutSessions = async (req, res) => {
    const hostId = req.params.hostId;

    try {
        const workoutSessions = await WorkoutSession.find({ host: hostId });

        if (workoutSessions.length === 0) {
            return res.status(404).send("No workout sessions found hosted by the given user ID");
        }

        res.status(200).json(workoutSessions);
    } catch (error) {
        res.status(500).send("Failed to retrieve Workout Sessions for host: " + error.message);
    }
};

//geolocate coordincates to address


