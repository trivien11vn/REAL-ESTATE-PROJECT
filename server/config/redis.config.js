const redis = require('redis');

const client = redis.createClient()

client.on('error', err => console.log('Redis Client Error', err));

const connectionRedis = async() => {
    await client.connect()
    console.log('Connected to Redis')
}

connectionRedis()
module.exports = client