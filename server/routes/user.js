const router = require('express').Router();
const Joi = require('joi');
const ctrls = require('../controllers/user');
const validateDto = require('../middlewares/validation');
const { stringReq, numberReq, string, array } = require('../middlewares/joiSchema');
const { verifyToken } = require('../middlewares/verifyToken');

router.get(
    '/current',
    verifyToken, 
    ctrls.getCurrent), 

router.get(
    '/roles', 
    ctrls.getRoles), 

router.put(
    '/profile', 
    verifyToken,
    validateDto(Joi.object({
        name: stringReq,
        email: stringReq,
        address: stringReq,
        avatar: array,
        phone: string
    })),
    ctrls.updateCurrent), 

module.exports = router