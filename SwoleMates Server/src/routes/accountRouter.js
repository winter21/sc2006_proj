const express = require("express");
const router = express.Router();
const accountController = require('../controllers/accountController');

//GET method for getting 1 account
//router.get("/:username",accountController.getOneAccount);

//POST method to create 1 new account
router.post("/register", accountController.createAccount);

//POST method to log into account
router.post("/login", accountController.login);

//POST method to request for password reset
router.post("/request-password-reset", accountController.forgetPassword)

//PUT method to update the password
router.put("/password-reset", accountController.updatePassword)

router.post("/check-jwt", accountController.checkJwtToken)

module.exports = router;