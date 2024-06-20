const { throwErrorWithStatus } = require("./errorHandler");

const validateDto = (schema) => (req,res,next)=>{  
    const {error} = schema.validate(req.body);
    if(error){
        // return res.status(403).json({
            //     success: false,
            //     message: error.details[0].message
            // })
        const message = error.details[0].message?.replaceAll('\"',"")
        throwErrorWithStatus(403, message, res, next)
    }
    next()
}

module.exports = validateDto;