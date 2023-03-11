const UserAPI = require('../models/userApi')
const { NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const createAPI = async(req,res)=>{
    const {userId} = req.body
    const api = await UserAPI.create({createdBy:userId,...req.body})
    res.status(StatusCodes.OK).json({api})
}
const getSingleAPI = async(req,res)=>{
    const {userId} = req.body
    const jobId = req.params.id
    const api = await UserAPI.findById({createdBy:userId,_id:jobId})
    if (!api){
        throw new NotFoundError(`No api with ID: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({api})
}
const getAllAPIs = async(req,res)=>{
    const {userId} = req.body
    const api = await UserAPI.find({createdBy:userId})
    res.status(StatusCodes.OK).json({api,nbHits:api.length})
}
const updateAPI = async(req,res)=>{
    const {userId} = req.body
    const jobId = req.params.id
    const api = await UserAPI.findByIdAndUpdate({createdBy:userId,_id:jobId},{...req.body},{runValidators: true ,new:true})
    if (!api){
        throw new NotFoundError(`No api with ID: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({api})
}
const deleteAPI = async(req,res)=>{
    const {userId} = req.body
    const jobId = req.params.id
    const api = await UserAPI.findByIdAndDelete({createdBy:userId,_id:jobId})
    if (!api){
        throw new NotFoundError(`No api with ID: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({api})
}
module.exports ={getSingleAPI,getAllAPIs,createAPI,updateAPI,deleteAPI}