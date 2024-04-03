const jwt = require('jsonwebtoken')
const secret = "CooCooPioPio"

exports.generateToken = (userId, time) => {
    const token = jwt.sign({userId: userId}, secret, {
        expiresIn: time
    })
    return token
}