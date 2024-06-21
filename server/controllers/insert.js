// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const { roles } = require('../utils/constants');

const initRole = asyncHandler(async (req, res) => {
    // Handle logic: goi thong tin -> check tai khoan da ton tai chua (check phone) -> save vao db
    const response = await db.Role.bulkCreate(roles)
    return res.json({
        success: Boolean(response),
        mes: response ? 'Inserted successfully' : 'Something went wrong',
    })
})


module.exports = {
    initRole,
}