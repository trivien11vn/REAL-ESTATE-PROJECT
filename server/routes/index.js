const { errHandler, badRequestException } = require('../middlewares/errorHandler')
const authRouter = require('./auth')
const userRouter = require('./user')
const propertyRouter = require('./property')
const propertyTypeRouter = require('./propertyType')
const initRoutes = (app) => { 
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/property_type', propertyTypeRouter)
    app.use('/api/property', propertyRouter)
    app.use('/', badRequestException)
    app.use(errHandler)
 }

module.exports = initRoutes