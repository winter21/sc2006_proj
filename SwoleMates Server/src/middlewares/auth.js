const jwt = require('jsonwebtoken')
const secret = "CooCooPioPio"

exports.generateToken = (userId, name, time) => {
    const token = jwt.sign({userId: userId, name:name}, secret, {
        expiresIn: time
    })
    return token
}

exports.verifyToken = (token) => {
    return jwt.verify(token,secret)
}

exports.decodeToken = (token) => {
    return jwt.decode(token,secret)
}