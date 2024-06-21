const { throwErrorWithStatus } = require("./errorHandler");
const jwt = require("jsonwebtoken");
const db = require("../models");

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

const isAgent = async(req, res, next) => {
    const {roleCode} = req.user

    if(roleCode === '4'){
        return throwErrorWithStatus(401, 'You dont have permission to access', res, next)
    }
    next()
}

const isAdmin = async(req, res, next) => {
    const {roleCode} = req.user

    if(roleCode !== '1'){
        return throwErrorWithStatus(401, 'You dont have permission to access', res, next)
    }
    next()
}

const isOwner = async(req, res, next) => {
    const {roleCode} = req.user

    if(roleCode === '4' || roleCode === '3') {
        return throwErrorWithStatus(401, 'You dont have permission to access', res, next)
    }
    next()
}
module.exports = {
    verifyToken,
    isAgent,
    isAdmin,
    isOwner
 }