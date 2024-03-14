const Account = require("../models/account");

exports.createAccount = async (req,res) => {
    var username = req.body.username;
    var email = req.body.user.email;
    var password = req.body.password;
    var user = {email}
    try{
        const newAccount = new Account({username, password, user});
        await newAccount.save();
        res.status(201).send("User registered successfully");
    }catch(error){
        res.status(500).send(error.message);
    }
};