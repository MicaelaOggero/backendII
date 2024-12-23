import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
    },
    code:{
        type:String,
        unique: true,
    },
    schedule: { 
        type: String 
    },
})

export default mongoose.model('courses', courseSchema)