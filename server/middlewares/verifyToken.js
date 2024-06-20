const { throwErrorWithStatus } = require("./errorHandler");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => { 
    //get token
    const token = req?.headers?.authorization?.startsWith("Bearer");
    if (!token) {
        throwErrorWithStatus(401, 'Creds not provide', res, next)
    }
    else{
        const rawToken = req?.headers?.authorization?.split(" ")[1];
        jwt.verify(rawToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                throwErrorWithStatus(403, 'Token is not valid', res, next)
            }
            req.user = decode
            next()
        })
    }
 }

 module.exports = {
    verifyToken
 }