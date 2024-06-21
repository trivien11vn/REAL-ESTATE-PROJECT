// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const createNewProperty = asyncHandler(async (req, res) => {
    const {uid, role} = req.user; 

    // Handle logic: goi thong tin -> check tai khoan da ton tai chua (check phone) -> save vao db
    const response = await db.User.findByPk(uid,{
        attributes: {
            exclude: ['password']
        }
    })

    return res.json({
        success: Boolean(response),
        mes: response ? 'Success' : 'User not found',
        currentUser: response
    })

})


module.exports = {
    createNewProperty
}