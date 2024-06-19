// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');

const register = asyncHandler(async (req, res) => {
    // password, phone, email, role (enum:[USER, AGENT])

    // client sent: urlencode - form data ---> req.body
    // client sent: params (?q=abcd) ---> req.query
    // client sent: api/user/:id ---> req.params

    const {password, phone, email, role} = req.body; //urlencode - form data

    // Handle logic: goi thong tin -> check tai khoan da ton tai chua (check phone) -> save vao db
    const response = await db.User.findOrCreate({
        where: {phone: phone},
        defaults: req.body
    })

    return res.json({
        success: response[1],
        mes: response[1] ? 'Success' : 'Phone number already exists',
    })

})

module.exports = {
    register,

}