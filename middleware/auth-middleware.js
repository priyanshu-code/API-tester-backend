require('dotenv').config()
const User = require('../models/user')
const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')
const authMiddleware = async (req,res,next)=>{
    const {authorization}= req.headers
    if(!authorization || !authorization.startsWith('Bearer ')){
        throw new UnauthenticatedError("Unauthorized, Please Login")
    }
    const token = authorization.split(' ')[1]
    try {
        const authintecated = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:authintecated.id})
        if (!user){
            throw new UnauthenticatedError("Unauthorized, Please Login")
        }
        req.body.userId = authintecated.id
        next()
    } catch (error) {
        throw new UnauthenticatedError("Unauthorized, Please Login")
    }
}

module.exports = authMiddleware