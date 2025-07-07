import mongoose, { Schema } from "mongoose"

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  ingredients: {
    type: String
  },
  allergens: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true
  },
  modifiers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modifier'
     }]
})

export default mongoose.model('Product', productSchema)
