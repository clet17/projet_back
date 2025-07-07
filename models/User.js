import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true 
    },
    address : {
        type : String
    },
    is_admin : {
        type : Boolean,
        default : false
    }
})

export default mongoose.model('User', userSchema)