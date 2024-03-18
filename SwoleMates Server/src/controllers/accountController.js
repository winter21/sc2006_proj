const Account = require("../models/account");
const bcrypt = require("bcrypt")

//Create account with POST request
exports.createAccount = async (req,res) => {
    const username = req.body.username;
    const password = req.body.password
    try{
        const oneAccount = await Account.findOne({username: username})
        if(oneAccount){
            throw new Error("Duplicate username")
        }
        const newAccount = new Account({username, password})
        await newAccount.save()
        res.status(201).send("User registered successfully")
    }catch(err){
        if(err.message == "Duplicate username"){
            res.status(409).send({
                type:"AccountExist",
                status: 409,
                message: "There exist an account with this username"
            })
        }else{
            res.status(500).send({
                type:"CreateAccountError",
                status: 500,
                message: "Error Creating Account",
                err: err.stack
            })
        }
    }
}

exports.login = async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    try{
        const oneAccount = await Account.findOne({username: username})
        if(oneAccount){
            if(checkPassword(oneAccount,password)){
                res.status(201).send("Login Successful")
            }else{
                throw new Error("Wrong Login details")
            }
        }else{
            throw new Error("Account Not Found")
        }
    }catch(err){
        if(err.message == "Wrong Login details"){
            res.status(401).send({
                type:"WrongLoginDetails",
                status: 401,
                message: "You have entered the wrong username/password"
            })
        }else if(err.message == "Account Not Found"){
            console.log(err.message)
            res.status(401).send({
                type:"NoAccountFound",
                status: 401,
                message: "Account not found"
            })
        }else{
            res.status(500).send({
                type:"LoginAccountError",
                status: 500,
                message: "Error Logging into Account",
                err: err.stack
            })
        }
    }

}


//Helper methods
const checkPassword = (account, password) => {
    return bcrypt.compare(account.password, password);
}