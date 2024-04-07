const User = require("../models/user");
const Account = require("../models/account");
const fs = require('fs-extra')
const auth = require("../middlewares/auth")
const utils = require("../middlewares/utils")

exports.getOneUser = async (req, res) => {
    const userID = req.params.userId
    try{
        const oneUser = await User.findById(userID)
        if(oneUser){
            res.status(201).send(oneUser)
        }else{
            throw new Error("No such User")
        }
    }catch(err){
        if(err.message == "No such User"){
            res.status(500).send({
                type:"UserIDError",
                status: 500,
                message: "Invalid user ID"
            })
        }
        else{
            res.status(500).send({
                type:"CreateAccountError",
                status: 500,
                message: "Error Creating User",
                err: err.stack
            })
        }
    }
}

exports.createUser = async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const aboutMe = req.body.aboutMe;
    const gender = req.body.gender;
    const tempInterest = req.body.interest;
    const accountID = req.body.accountID;
    const tempPath = req.file.path
    const folderName = req.body.type + '/'
    const fileName = req.file.filename
    let picturePath = ''
    var hasMovedImage = false;
    let interest = []
    try{
        if(tempInterest != ''){
            interest = tempInterest.split(',')
        }

        const oneUser = await User.findOne({email: email})
        if(oneUser){
            throw new Error("Duplicate email")
        }

        const currentAccount = await Account.findOne({_id: accountID})
        if(!currentAccount){
            throw new Error("Invalid account ID")
        }

        const newUser = new User({email, name, gender, aboutMe, interest})

        picturePath = await utils.moveImageFromTemp(tempPath, folderName, fileName)
        hasMovedImage = true

        newUser.profilePicture = picturePath
        await newUser.save()

        currentAccount.user = newUser._id
        await currentAccount.save()

        const token  = await auth.generateToken(newUser._id, newUser.name, '24h')
        res.status(201).send(token)
    }catch(err){
        console.log(err.message)
        const deletePath = hasMovedImage ? picturePath : tempPath 
        await utils.deleteImage(deletePath)
        if(err.message == "Duplicate email"){
            res.status(409).send({
                type:"UserExist",
                status: 409,
                message: "There exist an account with this email"
            })
        }else if(err.message == "Invalid account ID"){
            res.status(500).send({
                type:"AccountIDError",
                status: 500,
                message: "Invalid account ID"
            })
        }
        else{
            res.status(500).send({
                type:"CreateAccountError",
                status: 500,
                message: "Error Creating User",
                err: err.stack
            })
        }
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.params.userId
    const email = req.body.email;
    const name = req.body.name;
    const aboutMe = req.body.aboutMe;
    const gender = req.body.gender;
    const tempInterest = req.body.interest;

    let picturePath = ''
    var hasMovedImage = false;
    const tempPath = ''

    let interest = []
    try{
        if (!req.file) {
            throw new Error("No Image File")
        }
        tempPath = req.file.path
        const folderName = req.body.type + '/'
        const fileName = req.file.filename

        if(tempInterest != ''){
            interest = tempInterest.split(',')
        }

        const oneUser = await User.findById(userId)
        if(!oneUser){
            throw new Error("No such User")
        }

        const newEmailUser = await User.findOne({email: email})
        if(newEmailUser && newEmailUser._id != userId){
            throw new Error("Duplicate email")
        }

        const oldPicturePath = oneUser.profilePicture
        picturePath = await utils.moveImageFromTemp(tempPath, folderName, fileName)
        hasMovedImage = true

        oneUser.email = email;
        oneUser.name = name;
        oneUser.aboutMe = aboutMe;
        oneUser.gender = gender;
        oneUser.interest = interest;
        oneUser.profilePicture = picturePath
        await oneUser.save()
        await utils.deleteImage(oldPicturePath)

        res.status(201).send(oneUser)
    }catch(err){
        console.log(err.message)
        const deletePath = hasMovedImage ? picturePath : tempPath 
        await utils.deleteImage(deletePath)
        if(err.message == "No Image File"){
            res.status(400).send({
                type:"NoImageFile",
                status: 400,
                message: "No image file uploaded"
            })
        }else if(err.message == "Duplicate email"){
            res.status(409).send({
                type:"UserExist",
                status: 409,
                message: "There exist an account with this email"
            })
        }else if(err.message == "No such User"){
            res.status(500).send({
                type:"UserIDError",
                status: 500,
                message: "Invalid user ID"
            })
        }else{
            res.status(500).send({
                type:"UpdateAccountError",
                status: 500,
                message: "Error Creating User",
                err: err.stack
            })
        }
    }
}

exports.getListOfUsers = async (req, res) => {
    const userList = req.body.userList
    try{
        const userListInfo = await User.find({_id:{$in:userList}})
        res.status(201).send(userListInfo)
    }catch{
        res.status(500).send({
            type:"UpdateAccountError",
            status: 500,
            message: "Error Creating User",
            err: err.stack
        })
    }
}