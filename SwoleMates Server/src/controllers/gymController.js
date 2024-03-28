const Gym = require("../models/gym");

// exports.getAllGyms = async (req, res) => {
//     try {
//         const gyms = await Gym.find();
//         res.status(200).json(gyms);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

const axios = require('axios');

exports.getAllGyms = async (req, res) => {
    const fetchGyms = async (token = '', allGyms = []) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
                params: {
                    location: '1.3521,103.8198',
                    radius: 50000,
                    type: 'gym',
                    key: 'AIzaSyDKEBSYBdvZtuTcN7Lx8Mg6RTBaGtPCOQY', 
                    pagetoken: token
                }
            });

            const gyms = response.data.results.map(gym => ({
                name: gym.name,
                location: gym.geometry.location,
            }));

            allGyms.push(...gyms);

            
            if (response.data.next_page_token && allGyms.length < 500) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                return fetchGyms(response.data.next_page_token, allGyms);
            }

            return allGyms;
        } catch (error) {
            throw error;
        }
    };

    try {
        const gyms = await fetchGyms();
        res.status(200).json(gyms);
    } catch (error) {
        console.error('Error fetching gym locations:', error);
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






