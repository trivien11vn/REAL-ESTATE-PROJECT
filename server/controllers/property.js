// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');
const redis = require('../config/redis.config')

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

const getProperty = asyncHandler(async (req, res) => {
    const {limit, page, fields, name, sort, ...query} = req.query

    const options = {}
    if(fields){
        const attributes = fields.split(',')
        const isExclude = attributes.some(el => el.startsWith('-'))
        if(isExclude){
            options.attributes = {exclude: attributes.map(el => el.replace('-',''))}
        }
        else{
            options.attributes = attributes
        }
    } 

    // if(name){
    //     query.name = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLocaleLowerCase() + '%') 
    // }

    //Sorting
    // order = [[createdAt,ASC], [name,DESC]]
    if(sort){
        const order = sort.split(',').map(
            el => el.startsWith('-') ? [el.replace('-',''), 'DESC'] : [el, 'ASC']
        )
        options.order = order
    }

    if(!limit){
        const alreadyGetAll = await redis.get('get-property')
        if(alreadyGetAll) {
            return res.json({
                success: true,
                mes: 'Got successfully',
                property: JSON.parse(alreadyGetAll)
            })
        }
        const response = await db.Property.findAll({
            where: query,
            ...options,
        })

        redis.set('get-property', JSON.stringify(response))
        return res.json({
            success: response.length > 0 ? true : false,
            mes: response.length > 0 ? 'Got successfully' : 'Cannot get',
            property: response
        })
    }
    else{
        const prevPage = page-1 >= 0 ? page : 1
        const offset = (prevPage-1) * limit
        if(offset) options.offset = offset
        options.limit = +limit
        const response = await db.Property.findAndCountAll({
            where: query,
            ...options,
        })
        return res.json({
            success: Boolean(response),
            mes: response ? 'Got successfully' : 'Cannot get',
            property: response
        })
    }
})
module.exports = {
    createNewProperty,
    getProperty
}