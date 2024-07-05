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

const updateCurrent = asyncHandler(async (req, res) => {
    const {name, email, address, avatar, phone}  = req.body
    console.log(avatar)
    const {uid} = req.user
    const updateData = new Object()
    if(avatar && avatar?.length === 1) {
        updateData.avatar = avatar[0]
    }
    if(name){
        updateData.name = name
    }
    if(address){
        updateData.address = address
    }
    if(email){
        updateData.email = email
    }
    if(phone){
        const userRoles = await db.User_Role.findAll({
            where: {userId: uid},
            raw: true
        })
        if(userRoles.length === 1 && userRoles[0]?.roleCode === '4'){
            updateData.phone = phone
        }
    }
    const response = await db.User.update(
        updateData,
        {
            where: {id: uid}
        }
    )

    return res.json({
        success: response[0] > 0,
        mes: response[0] > 0 ? 'Updated successfully' : 'Cannot update'
    })

})
module.exports = {
    getCurrent,
    getRoles,
    updateCurrent
}