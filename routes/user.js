import { Router } from 'express'
import { getUser, updateUser } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const userRouter = Router()

userRouter.get('/user/me', authMiddleware, getUser)

userRouter.put('/user/me', authMiddleware, updateUser)

export default userRouter