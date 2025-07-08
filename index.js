// Import des modules nécessaires
import express from 'express'
import 'dotenv/config'
import connectDB from './database/client.js'
import cors from 'cors'

// Import des routes
import authRouter from './routes/auth.js'
import productCategoryRouter from './routes/productCategory.js'
import productRouter from './routes/protuct.js'
import modifierRouter from './routes/modifier.js'
import orderRouter from './routes/order.js'
import userRouter from './routes/user.js'
import paymentRouter from './routes/payment.js'

// Modules Node pour la gestion des fichiers
import fs from 'fs'
import path from 'path'

const app = express()
const PORT = process.env.PORT

// Middlewares globaux
app.use(cors()) // Autorise les requêtes entre domaines
app.use(express.json()) // Permet de lire le body JSON
app.use(express.urlencoded({ extended: true })) // Permet de lire les formulaires (ex: form-data)

// Point d'entrée des routes de l’API
app.use('/api', 
  authRouter,
  productCategoryRouter,
  productRouter,
  modifierRouter,
  orderRouter,
  userRouter,
  paymentRouter
)

// Route statique pour accéder aux images
app.use('/images', express.static('public/images'))

// Route de test pour vérifier que le serveur tourne
app.get('/', (req, res) => {
  res.send("Test du Beldiz")
})

// Route pour récupérer une image précise depuis public/images
app.get('/public/images/:filename', (req, res) => {
  const filename = path.basename(req.params.filename)
  const ext = path.extname(filename).toLowerCase()
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']

  // Vérifie que l’extension est autorisée
  if (!allowedExtensions.includes(ext)) {
    return res.status(400).json('Extension non autorisée')
  }

  const filePath = path.join('public', 'images', filename)

  // Vérifie que le fichier existe
  if (!fs.existsSync(filePath)) {
    return res.status(404).json('Fichier introuvable')
  }

  // Envoie l’image au client
  res.sendFile(path.resolve(filePath))
})

// Route pour récupérer la liste des fichiers images
app.get('/images', (req, res) => {
  fs.readdir('public/images', (err, files) => {
    if (err) {
      return res.status(500).send({ error: err })
    }
    res.send({ images: files })
  })
})

// Connexion à la base de données
connectDB()

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le server tourne sur le port ${PORT}`)
})
