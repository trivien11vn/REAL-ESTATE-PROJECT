// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
    // password, phone, email, role (enum:[USER, AGENT])

    // client sent: urlencode - form data ---> req.body
    // client sent: params (?q=abcd) ---> req.query
    // client sent: api/user/:id ---> req.params

    const {phone, name, password} = req.body; //urlencode - form data

    // Handle logic: goi thong tin -> check tai khoan da ton tai chua (check phone) -> save vao db
    const response = await db.User.findOrCreate({
        where: {phone: phone},
        defaults:{
            phone,
            name,
            password
        }
    })
    const userId = response[0].id
    if(userId){
        const roleCode = []
        
        if(req?.body?.roleCode){
            roleCode.push(req.body.roleCode)
        }
        const roleCodeBulk = roleCode.map(role => ({userId, roleCode: role}))
        const updateRole = await db.User_Role.bulkCreate(roleCodeBulk)
        if(!updateRole){
            await db.User.destroy({where: {id: userId}})
        }
    }
    return res.json({
        success: response[1],
        mes: response[1] ? 'Your account has been successfully created!' : 'Phone number already exists',
    })

})

const signIn = asyncHandler(async (req, res, next) => {
    const {phone, password} = req.body;
    const user = await db.User.findOne({
        where: {phone}
    })

    if(!user){
        throwErrorWithStatus(401, 'User not found', res, next)
    }
    else{
        const isMatchPassword = bcrypt.compareSync(password, user?.password)
        if(!isMatchPassword){
            throwErrorWithStatus(401, 'Something went wrong', res, next)
        }
        else{
            const token = jwt.sign({uid: user.id, roleCode: user.roleCode}, process.env.JWT_SECRET, {expiresIn: '7d'})
            return res.json({
                success: true,
                mes: 'Sign in is successful',
                accessToken: token
            }) 
        }
    }

})



module.exports = {
    register,
    signIn
}