import { Router } from 'express'
import { createPaymentIntent } from '../controllers/stripeController.js'

const paymentRouter = Router()

paymentRouter.post('/create-payment-intent', createPaymentIntent)

export default paymentRouter
