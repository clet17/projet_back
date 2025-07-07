import mongoose, { Schema } from 'mongoose';

const modifierSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  type : {
    type : String,
    enum : ['option', 'sauce', 'supplément'],
    required : true
  },
  image : {
    type : String
  },
  price : {
    type : Number,
    required : true
  }
});

export default mongoose.model('Modifier', modifierSchema);
