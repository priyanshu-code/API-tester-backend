const User = require('../models/user')
const UserAPI = require('../models/userApi')
const { UnauthenticatedError, NotFoundError, BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const register = async (req,res)=>{
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({token})
}
const login = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please Provide all fields!")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new NotFoundError(`No user found with E-mail ${email}`)
    }
    const auth = await user.comparePassword(password)
    if (!auth){
        throw new UnauthenticatedError(`Invalid Credentails`)
    } 
    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({token})
}
const deleteUser = async (req,res)=>{
    const {userId} = req.body
    await User.findByIdAndDelete({_id:userId})
    await UserAPI.deleteMany({createdBy:userId})
    res.status(StatusCodes.OK).json({msg:`user ${userId} deleted`})
}
const loggedIn = (req,res)=>{
    res.status(StatusCodes.OK).json()
}

module.exports = {login,register,deleteUser,loggedIn}