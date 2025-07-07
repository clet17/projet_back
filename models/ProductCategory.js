import mongoose, { Schema } from "mongoose";

const productCategorySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image : {
        type : String
    }
})

export default mongoose.model('ProductCategory', productCategorySchema)