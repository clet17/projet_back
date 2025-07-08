import mongoose, { Schema } from 'mongoose';

const modifierOrderSchema = new Schema({
  product_order : {
    type : Schema.Types.ObjectId,
    ref : 'ProductOrder',
    required : true
  },
  modifier : {
    type : Schema.Types.ObjectId,
    ref : 'Modifier',
    required : true
  }
});

export default mongoose.model('ModifierOrder', modifierOrderSchema);
