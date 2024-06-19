const { errHandler, badRequestException } = require('../middlewares/errorHandler')
const authRouter = require('./auth')

const initRoutes = (app) => { 
    app.use('/api/auth', authRouter)
    app.use('/', badRequestException)
    app.use(errHandler)
 }

module.exports = initRoutes