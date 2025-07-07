
import mongoose, { Schema } from 'mongoose'

const productOrderSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit_price: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  },
  modifiers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Modifier'
    }
  ]
}, { _id: false }) // désactive l’_id automatique pour chaque sous-doc, tu peux mettre à true si tu veux

const orderSchema = new Schema({
  order_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['En attente', 'En préparation', 'Prête', 'Récupérée'],
    default: 'En attente'
  },
  total_price: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product_orders: [productOrderSchema]
})

export default mongoose.model('Order', orderSchema)



// import mongoose, { Schema } from "mongoose";

// const orderSchema = new Schema({
//   order_date : {
//     type : Date,
//     default : Date.now
//   },
//   status : {
//     type : String,
//     enum : ['En attente', 'En préparation', 'Prête', 'Récupérée'],
//     default : 'En attente'
//   },
//   total_price : {
//     type : Number
//   },
//   user : {
//     type : mongoose.Schema.Types.ObjectId,
//     ref : 'User',
//     required : true
//   }
// });


// export default mongoose.model('Order', orderSchema)