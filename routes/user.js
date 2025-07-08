import { Router } from 'express'
import { getUser, updateUser } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const userRouter = Router()

//Les controllers sont toujours le dernier paramètre passé 
//authMiddlewaire est un middlewaire qui viens vérifier si le client est auuthentifié 


userRouter.get('/user/me', authMiddleware, getUser)

userRouter.put('/user/me', authMiddleware, updateUser)

export default userRouter