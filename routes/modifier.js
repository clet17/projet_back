import { Router } from 'express'
import { createModifier, getAllModifiers, updateModifier, deleteModifier } from '../controllers/modifierController.js'

import { upload } from '../middlewares/uploadFile.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { checkAdmin } from '../middlewares/checkAdmin.js'

const modifierRouter = Router()

//Les controllers sont toujours le dernier paramètre passé 
//authMiddlewaire est un middlewaire qui viens vérifier si le client est auuthentifié 
//checkAdmin est un middlewaire qui viens vérifier si le client est un Admin
//upload.single('image') est un middlewaire permetant d'upload une image


modifierRouter.get('/modifier', getAllModifiers)

modifierRouter.post('/modifier', upload.single('image'), authMiddleware, checkAdmin, createModifier)

modifierRouter.put('/modifier/:id', upload.single('image'), authMiddleware, checkAdmin, updateModifier)

modifierRouter.delete('/modifier/:id', authMiddleware, checkAdmin, deleteModifier)

export default modifierRouter
