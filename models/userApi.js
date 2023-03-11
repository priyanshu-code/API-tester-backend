const mongoose =  require('mongoose')

const userAPIScherma = mongoose.Schema({
    APIName:{
        type:String,
        required:[true,"Please provide APIname"],
        minlength:3,
        maxlength:20
    },
    url:{
        type:String,
        required:[true,"Please provide url"],
        minlength:3,
        maxlength:20,
        match:[/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/,"Please provide valid url"]
    },
    method:{
        type:String,
        required:[true,"Please provide method"],
        enum:['GET','POST','PATCH','PUT','DELETE'],
        default:'GET'
    },
    APIHeaders:[{
        headerName:{
            type:String,
            required:[true,"Please provide header name"]
        },
        headerValue:{
            type:String,
            required:[true,"Please provide header value"],
            maxlength:500
        }
    }],
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please porvide userId']
    }
},{timestamps:true})
module.exports = mongoose.model("UserAPI",userAPIScherma)