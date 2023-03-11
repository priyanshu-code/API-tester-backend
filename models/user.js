require('dotenv').config()
const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { timeStamp } = require('console')
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide Username"],
        minlength:3,
        maxlength:30,
        unique:true
    },
    firstName:{
        type:String,
        required:[true,"Please provide First name"],
        minlength:3,
        maxlength:30
    },
    lastName:{
        type:String,
        required:[true,"Please provide Last name"],
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide Email"],
        minlength:3,
        maxlength:50,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please provide valid email"],
    },
    password:{
        type:String,
        required:[true,"Please provide password"],
        minlength:[6,'Your password must be at leeast 6 characters long'],
        maxlength:20,       
    }

},)
userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = function(candidatePassword){
   const isMatch = bcrypt.compare(candidatePassword,this.password)
   return isMatch;
}
module.exports = mongoose.model("User",userSchema)