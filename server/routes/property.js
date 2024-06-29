const router = require('express').Router();
const Joi = require('joi');
const ctrls = require('../controllers/property');
const { stringReq, string } = require('../middlewares/joiSchema');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');
const validateDto = require('../middlewares/validation');
const rateLimit = require('../middlewares/rateLimit');

router.use(rateLimit)

router.get(
    '/',
    ctrls.getProperty), 


//PUT dùng để cập nhật toàn bộ tài nguyên, còn PATCH dùng để cập nhật một phần tài nguyên.
    
module.exports = router