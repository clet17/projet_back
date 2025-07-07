import mongoose, { Schema } from 'mongoose';

const productOrderSchema = new Schema({
  order : {
    type : Schema.Types.ObjectId,
    ref : 'Order',
    required : true
  },
  product : {
    type : Schema.Types.ObjectId,
    ref : 'Product',
    required : true
  },
  quantity : {
    type : Number,
    required : true
  },
  comment : {
    type : String
  },
  unit_price : {
    type : Number,
    required : true
  }
});

export default mongoose.model('ProductOrder', productOrderSchema);
