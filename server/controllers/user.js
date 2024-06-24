// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const getCurrent = asyncHandler(async (req, res) => {
    const {uid} = req.user; 

    // Handle logic: goi thong tin -> check tai khoan da ton tai chua (check phone) -> save vao db
    const response = await db.User.findByPk(uid,{
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: db.User_Role,
                as: 'userRoles',
                attributes: ['roleCode'],
                include:[
                    {
                        model: db.Role,
                        as: 'roleName',
                        attributes: ['value'],
                        nest: false
                    }
                ]
            }
        ]
    })

    return res.json({
        success: Boolean(response),
        mes: response ? 'Success' : 'User not found',
        currentUser: response
    })

})

const getRoles = asyncHandler(async (req, res) => {
    const response = await db.Role.findAll({
        attributes: ['id', 'code', 'value']
    })

    return res.json({
        success: Boolean(response),
        mes: response ? 'Success' : 'Cannot find',
        roles: response
    })

})


module.exports = {
    getCurrent,
    getRoles
}