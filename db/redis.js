const redis = require('redis')

const redisClient = redis.createClient({
    post:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT
})

module.exports = redisClient;