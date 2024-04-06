const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const AccountSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: [true, "Username cannot be empty"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})

AccountSchema.pre('save', async function(next) {
    const account = this
    if (!account.isModified('password')) {
        console.log("password not changed")
        return next();
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(account.password,salt)
    account.password = hash
    return next()
})

module.exports = mongoose.model("Account", AccountSchema);