const express = require("express");
const router = express.Router();
const gymController = require('../controllers/gymController');

//GET method to get all gyms
router.get("/",gymController.getAllGyms);

//GET method to get one gym
router.get("/:id",gymController.getGym);


module.exports = router;