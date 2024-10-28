const JWT = require('jsonwebtoken')
const secretKey = "$uperMan@main.com"

function createTokenForUser(user){
    const payload = {
        _id:user._id,
        name:user.fullName,
        email:user.email,
        role:user.role
    };

    const token = JWT.sign(payload,secretKey)
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secretKey);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}