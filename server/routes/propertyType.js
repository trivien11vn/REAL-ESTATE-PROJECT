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


//PUT dùng để cập nhật toàn bộ tài nguyên, còn PATCH dùng để cập nhật một phần tài nguyên.
router.patch(
    '/:id',
    verifyToken,
    isAdmin,
    validateDto(Joi.object({
        name: string,
        description: string,
        image: string
    })),
    ctrls.updatePropertyType), 


router.delete(
    '/:id',
    verifyToken,
    isAdmin,
    ctrls.removePropertyType), 
    
module.exports = router