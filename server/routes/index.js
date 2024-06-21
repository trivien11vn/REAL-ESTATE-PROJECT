const { errHandler, badRequestException } = require('../middlewares/errorHandler')
const authRouter = require('./auth')
const userRouter = require('./user')
const insertRouter = require('./insert')
const initRoutes = (app) => { 
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/insert', insertRouter)
    app.use('/', badRequestException)
    app.use(errHandler)
 }

module.exports = initRoutes