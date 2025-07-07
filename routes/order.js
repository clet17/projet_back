import { Router } from 'express'
import { createOrder, getAllOrders, getUserOrders, updateOrderStatus } from '../controllers/orderController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { checkAdmin } from '../middlewares/checkAdmin.js'
import { upload } from '../middlewares/uploadFile.js'

const orderRouter = Router()

orderRouter.post('/order', upload.none(), authMiddleware, createOrder)

orderRouter.get('/order', authMiddleware, getUserOrders)

orderRouter.get('/orders', authMiddleware, checkAdmin, getAllOrders)

orderRouter.put('/order/:id', authMiddleware, checkAdmin, updateOrderStatus)

export default orderRouter
