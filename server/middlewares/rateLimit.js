const e = require('express')
const redis = require('../config/redis.config')

const rateLimit = async(req, res, next) => { 
    const clientId = req?.headers?.client_id

    const currentTime = Date.now()  // Return mili seconds
    const client = await redis.hGetAll(`rateLimit-${clientId}`)

    if(Object.keys(client).length === 0){
        await redis.hSet(`rateLimit-${clientId}`,'createdAt', currentTime)
        await redis.hSet(`rateLimit-${clientId}`,'count', 1)

        return next()
    }
    else{
        let difference = (+currentTime - +client.createdAt) / 1000
        if(difference >= process.env.RATE_LIMIT_RESET){
            await redis.hSet(`rateLimit-${clientId}`,'createdAt', currentTime)
            await redis.hSet(`rateLimit-${clientId}`,'count', 1)

            return next()
        }
        else{
            if(client?.count > process.env.RATE_LIMIT_COUNT){
                return res.status(429).json({
                    success: false,
                    mes: 'Rate limit exceeded'
                })
            }
            else{
                await redis.hSet(`rateLimit-${clientId}`,'count', +client?.count+1)
                return next()
            }
        }
    }
 }

module.exports = rateLimit