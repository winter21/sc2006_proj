const Account = require("../models/account");
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const secret = "CooCooPioPio"

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
        res.status(201).send(newAccount)
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
            const validAccount = await checkPassword(oneAccount,password)
            if(validAccount){
                if(!oneAccount.user){
                    throw new Error("User not Created")
                }
                const currentUser = await User.findById(oneAccount.user)
                console.log(currentUser)
                const token  = await jwt.sign({userId: currentUser._id, name: currentUser.name}, secret, {
                    expiresIn:'24h'
                })
                res.status(201).send(token)
            }else{
                throw new Error("Wrong Login details")
            }
        }else{
            throw new Error("Wrong Login details")
        }
    }catch(err){
        if(err.message == "Wrong Login details"){
            res.status(401).send({
                type:"WrongLoginDetails",
                status: 401,
                message: "You have entered the wrong username/password"
            })
        }else if(err.message == "User not Created"){
            res.status(403).send({
                type:"UserNotCreated",
                status: 403,
                message: "You have not create a user profile."
            })
        }
        else{
            res.status(500).send({
                type:"LoginAccountError",
                status: 500,
                message: "Error Logging into Account",
                err: err.stack
            })
        }
    }
}


exports.forgetPassword = async (req, res) => {
    const email = req.body.email

    try{
        const user = await User.findOne({email: email})
        if(!user){
            throw new Error("Invalid Email")
        }
        const token  = await jwt.sign({_id: user._id}, secret, {
            expiresIn:'10m'
        })
        
        let url = "http://localhost:5173/reset-password?token="+token
        console.log(token)
        
        var mailOptions = {
            from: "swolemates.auth.service@gmail.com",
            to: user.email,
            subject: 'Reset Password',
            html: 'Hi, '+ user.name +
            '<br>We got a request for reset password. Click on the link '+
            '<a href=\''+ url+ '\'>here</a>'+
            ' to reset your password<br><br>'+
            '<br><br>If you did not send a request, ignore this email'
        }


        var transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'swolemates.auth.service@gmail.com',
                pass: 'fiim locs fwjz zmtq'
            },
        })

        var result = await transporter.sendMail(mailOptions)
        res.status(200).send(result)
    }catch(err){
        if(err.message == "Invalid Email"){
            res.status(401).send({
                type:"WrongEmail",
                status: 401,
                message: "You have entered the wrong email"
            })
        }else{
            res.status(500).send({
                type:"SendEmailError",
                status: 500,
                message: "Error Sending Email",
                err: err.stack
            })
        }
    }
}

exports.updatePassword = async (req, res) => {
    const token = req.body.token;
    try{
        const authorised  = await jwt.verify(token, secret);
        const account = await Account.findOne({user:authorised._id})
        console.log(authorised._id)
        account.password = req.body.password
        await account.save()
        res.status(201).send(account)
    }catch(err) {
        if(err.message == "invalid signature" || err.message == "jwt expired"){
            res.status(401).send({
                type: "InvalidToken",
                status: 401,
                message: 'Authentication token invalid or expired.'
            });
        }else{
            console.log(err.stack)
            res.status(500).send({
                type:"UpdatePasswordError",
                status: 500,
                message: "Error updating password",
                err: err.stack
            })

        }
    }
}

exports.checkJwtToken = async (req, res) => {
    const token  = req.body.token
    try{
        result = jwt.verify(token,secret)
        if(result){
            res.status(200).send(result)
        }else{
            throw new Error("invalid token")
        }
    }catch(err){
        res.status(500).send(err.message)
    }
}

//Helper methods
const checkPassword = (account, password) => {
    return bcrypt.compare(password,account.password);
}