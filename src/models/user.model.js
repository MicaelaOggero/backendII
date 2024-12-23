import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        default:""
    },
    lastName:{
        type:String,
        default:""
    },
    email:{
        type:String,
        default:""
    },
    age: {
        type:Number,
        default:0
    },
    password:{
        type:String,
        default:""
    },
    idGithub:{
        type:String,
        default:""
    },
    roles:{
        type:[String],
        default:["student"]
    }
})

export default mongoose.model('users', userSchema)