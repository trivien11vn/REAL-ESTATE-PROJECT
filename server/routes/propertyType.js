const router = require('express').Router();
const Joi = require('joi');
const ctrls = require('../controllers/propertyType');
const { stringReq, string } = require('../middlewares/joiSchema');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');
const validateDto = require('../middlewares/validation');

router.post(
    '/',
    verifyToken,
    isAdmin, 
    validateDto(Joi.object({
        name: stringReq,
        description: stringReq,
        image: stringReq
    })),
    ctrls.createNewPropertyType), 

router.get(
    '/',
    ctrls.getPropertyType), 

module.exports = router