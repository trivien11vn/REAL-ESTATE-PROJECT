// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');
const redis = require('../config/redis.config');
const { Sequelize, Op } = require('sequelize');

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
    const {limit, page, fields, sort, address, price, ...query} = req.query

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

    // Filter by client
    if(address){
        query.address = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Property.address')), 'LIKE', '%' + address.toLocaleLowerCase() + '%') 
    }

    if(price){
        const isBetween  = price?.every(el => !isNaN(el))
        if(isBetween){
            query.price = {[Op.between]: price}
        }
        else{
            const number = price?.find(el => !isNaN(el))
            const operator = price?.find(el => isNaN(el)) // operator === 'lte' or 'gte'
            query.price = {[Op[operator]]: number}
        }
    }
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
            include: [
                {
                    model: db.User, 
                    as: 'rPostedBy', 
                    attributes: ['avatar', 'phone', 'name', 'email']
                },
                {
                    model: db.User, 
                    as: 'rOwner', 
                    attributes: ['avatar', 'phone', 'name', 'email']
                }
            ]
        })
        return res.json({
            success: Boolean(response),
            mes: response ? 'Got successfully' : 'Cannot get',
            property: response ? {...response, limit: +limit, page: +page ? +page : 1} : null
        })
    }
})

const getDetailById = asyncHandler(async (req, res) => {
    const {propertyId} = req.params
    const response = await db.Property.findByPk(propertyId, {
        include: [
            {
                model: db.PropertyType, 
                as: 'rPropertyType', 
                attributes: ['name', 'description', 'image']
            },
            {
                model: db.User, 
                as: 'rPostedBy', 
                attributes: ['avatar', 'phone', 'name', 'email']
            },
            {
                model: db.User, 
                as: 'rOwner', 
                attributes: ['avatar', 'phone', 'name', 'email']
            }
        ]
    })
    return res.json({
        success: Boolean(response),
        mes: response ? 'Got successfully' : 'Cannot get',
        property: response
    })
})

module.exports = {
    createNewProperty,
    getProperty,
    getDetailById
}