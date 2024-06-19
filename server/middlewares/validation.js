const { throwErrorWithStatus } = require("./errorHandler");

const validateDto = (schema) => (req,res,next)=>{  
    console.log('111')
    console.log({next})
    const {error} = schema.validate(req.body);
    console.log(error)
    console.log('222')
    if(error){
        console.log('333')
        // return res.status(403).json({
            //     success: false,
            //     message: error.details[0].message
            // })
        const message = error.details[0].message?.replaceAll('\"',"")
        console.log(message)
        throwErrorWithStatus(403, message, res, next)
    }
    next()
}

module.exports = validateDto;