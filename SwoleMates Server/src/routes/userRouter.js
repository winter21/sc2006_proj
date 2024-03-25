const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('../middlewares/multer');

//GET method to get 1 user
router.get("/:userId", userController.getOneUser)

//POST method to create 1 new user
router.post("/", userController.createUser)

//PUT method to update 1 user details
router.put("/:userId", userController.updateUser)

//PUT method to update 1 user details
router.put("/profilePicture/:userId", multer.single('photo'), userController.updateProfilePicture)

module.exports = router;