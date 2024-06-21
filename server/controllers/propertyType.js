// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const createNewPropertyType = asyncHandler(async (req, res) => {
    const {name} = req.body
    const response = await db.PropertyType.findOrCreate({
        where: {name},
        defaults: req.body
    })

    return res.json({
        success: response[1],
        mes: response[1] ? 'Created successfully' : 'Cannot create',
        propertyType: response[0]
    })

})


module.exports = {
    createNewPropertyType
}