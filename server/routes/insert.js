const router = require('express').Router();
const ctrls = require('../controllers/insert');
router.post(
    '/roles', 
    ctrls.initRole), 

module.exports = router