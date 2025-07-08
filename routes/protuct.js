import { Router } from 'express'
import { createProduct, getAllProducts, updateProduct, deleteProduct, getProductById } from '../controllers/productController.js'
import { upload } from '../middlewares/uploadFile.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { checkAdmin } from '../middlewares/checkAdmin.js'

const productRouter = Router()

//Les controllers sont toujours le dernier paramètre passé 
//authMiddlewaire est un middlewaire qui viens vérifier si le client est auuthentifié 
//checkAdmin est un middlewaire qui viens vérifier si le client est un Admin
//upload.single('image') est un middlewaire permetant d'upload une image


productRouter.get('/product', getAllProducts)
productRouter.get('/product/:id', getProductById)


productRouter.post('/product', upload.single('image'), authMiddleware, checkAdmin, createProduct)

productRouter.put('/product/:id', upload.single('image'), authMiddleware, checkAdmin, updateProduct)

productRouter.delete('/product/:id', authMiddleware, checkAdmin, deleteProduct)

export default productRouter
