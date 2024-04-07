const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('../middlewares/multer');

//GET method to get 1 user
router.get("/userList", userController.getListOfUsers)

//GET method to get 1 user
router.get("/:userId", userController.getOneUser)

//POST method to create 1 new user
router.post("/", multer.single('photo'), userController.createUser)

//PUT method to update 1 user details
router.put("/:userId", multer.single('photo'), userController.updateUser)


module.exports = router;