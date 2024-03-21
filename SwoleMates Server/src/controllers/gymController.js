const Gym = require("../models/gym");

exports.getAllGyms = async (req, res) => {
    try {
        const gyms = await Gym.find();
        res.status(200).json(gyms);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getGym = async (req, res) => {
    try {
        const gym = await Gym.findById(req.params.id);
        if (!gym) {
            return res.status(404).send("Gym not found");
        }
        res.status(200).json(gym);
    } catch (error) {
        res.status(500).send(error.message);
    }
};




