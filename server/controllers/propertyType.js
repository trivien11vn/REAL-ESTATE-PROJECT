// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const { options } = require('joi');
const { Sequelize } = require('sequelize');

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

const getPropertyType = asyncHandler(async (req, res) => {
    const {limit, page, fields, name, sort, ...query} = req.query
    console.log(query)

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

    if(name){
        query.name = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLocaleLowerCase() + '%') 
    }

    //Sorting
    if(sort){
        const order = sort.split(',')
        options.order = order.map(el => {
            if(el.startsWith('-')){
                return [el.replace('-',''), 'DESC']
            }
            return [el, 'ASC']
        })
    }

    if(!limit){
        const response = await db.PropertyType.findAll({
            where: query,
            ...options,
        })
        return res.json({
            success: response.length > 0 ? true : false,
            mes: response.length > 0 ? 'Got successfully' : 'Cannot get',
            propertyType: response
        })
    }
    else{
        const prevPage = page-1 >= 0 ? page : 1
        const offset = (prevPage-1) * limit
        if(offset) options.offset = offset
        options.limit = +limit
        console.log(options)
        const response = await db.PropertyType.findAndCountAll({
            where: query,
            ...options,
        })
        return res.json({
            success: response.length > 0 ? true : false,
            mes: response.length > 0 ? 'Got successfully' : 'Cannot get',
            propertyType: response
        })
    }
})


module.exports = {
    createNewPropertyType,
    getPropertyType
}