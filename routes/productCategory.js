import { Router } from "express"
import { createProductCategory, deleteProductCategory, getAllProductCategory, updateProductCategory } from "../controllers/categoryController.js"

import { upload } from "../middlewares/uploadFile.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { checkAdmin } from "../middlewares/checkAdmin.js"

//Les controllers sont toujours le dernier paramètre passé 
//authMiddlewaire est un middlewaire qui viens vérifier si le client est auuthentifié 
//checkAdmin est un middlewaire qui viens vérifier si le client est un Admin
//upload.single('image') est un middlewaire permetant d'upload une image


const productCategoryRouter = Router()

productCategoryRouter.get('/productCategory', getAllProductCategory)

productCategoryRouter.post('/productCategory', upload.single('image'), authMiddleware, checkAdmin, createProductCategory)

productCategoryRouter.put('/productCategory/:id', upload.single('image'), authMiddleware, checkAdmin, updateProductCategory)

productCategoryRouter.delete('/productCategory/:id', authMiddleware, checkAdmin, deleteProductCategory)

export default productCategoryRouter