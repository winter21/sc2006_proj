const axios = require('axios'); //lester testing

const GOOGLEMAP_API_KEY = process.env.GOOGLE_API_KEY; //testing

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



exports.findNearbyGyms = async function (latitude, longitude) { //lester testing
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const params = {
        location: `${latitude},${longitude}`,
        radius: 2000, // Search within 2km radius
        type: 'gym',
        key: GOOGLEMAP_API_KEY
    };

    console.log(params);

    try {
        const response = await axios.get(url, { params });
        return response.data.results; // Returns array of gym locations
    } catch (error) {
        console.log(error.stack);
        console.error("Error fetching nearby gyms: ", error);
        throw error;
    }
};

exports.findAllGyms = async function () { //lester testing
    const locations = [{ latitude: SINGAPORE_LATITUDE, longitude: SINGAPORE_LONGTITUDE }];
    const radius = 40000; 
    const type = 'gym';

    let allGyms = [];

    for (let location of locations) {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
        const params = {
            location: `${location.latitude},${location.longitude}`,
            radius,
            type,
            key: GOOGLEMAP_API_KEY
        };

        try {
            const response = await axios.get(url, { params });
            allGyms.push(...response.data.results);
        } catch (error) {
            console.error("Error fetching gyms: ", error);
            throw error;
        }
    }

    return allGyms;
};





