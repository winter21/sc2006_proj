const express = require("express");
const router = express.Router();
const accountController = require('../controllers/accountController');

//GET method for getting 1 account
//router.get("/:username",accountController.getOneAccount);

//POST method to create 1 new account
router.post("/register",accountController.createAccount);

module.exports = router;