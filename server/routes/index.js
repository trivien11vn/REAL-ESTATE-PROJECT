const { errHandler, badRequestException } = require('../middlewares/errorHandler')
const authRouter = require('./auth')
const userRouter = require('./user')
const initRoutes = (app) => { 
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/', badRequestException)
    app.use(errHandler)
 }

module.exports = initRoutes