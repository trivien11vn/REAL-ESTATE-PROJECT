// register + login
const asyncHandler = require('express-async-handler');
const db = require('../models');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const { options, when } = require('joi');
const { Sequelize } = require('sequelize');
const redis = require('../config/redis.config')

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
    // order = [[createdAt,ASC], [name,DESC]]
    if(sort){
        const order = sort.split(',').map(
            el => el.startsWith('-') ? [el.replace('-',''), 'DESC'] : [el, 'ASC']
        )
        options.order = order
    }

    if(!limit){
        const alreadyGetAll = await redis.get('get-propertyType')
        if(alreadyGetAll) {
            return res.json({
                success: true,
                mes: 'Got successfully',
                propertyType: JSON.parse(alreadyGetAll)
            })
        }
        const response = await db.PropertyType.findAll({
            where: query,
            ...options,
        })

        redis.set('get-propertyType', JSON.stringify(response))
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
        const response = await db.PropertyType.findAndCountAll({
            where: query,
            ...options,
        })
        return res.json({
            success: Boolean(response),
            mes: response ? 'Got successfully' : 'Cannot get',
            propertyType: response
        })
    }
})

const updatePropertyType = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    if(Object.keys(req.body).length === 0){
        return throwErrorWithStatus(403, 'No data to update', res, next)
    }
    const response = await db.PropertyType.update(req.body,{where: {id}})
    return res.json({
        success: response[0] > 0,
        mes: response[0] > 0 ? 'Updated successfully' : 'Cannot update'
    })
})

const removePropertyType = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    const response = await db.PropertyType.destroy({where: {id}})
    return res.json({
        success: response > 0,
        mes: response > 0 ? 'Deleted successfully' : 'Cannot delete'
    })
})


module.exports = {
    createNewPropertyType,
    getPropertyType,
    updatePropertyType,
    removePropertyType
}