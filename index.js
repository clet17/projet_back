import express from 'express'
import 'dotenv/config'
import connectDB from './database/client.js'
import cors from 'cors'
import authRouter from './routes/auth.js'

import fs from 'fs'
import path from 'path'
import productCategoryRouter from './routes/productCategory.js'
import productRouter from './routes/protuct.js'
import modifierRouter from './routes/modifier.js'
import orderRouter from './routes/order.js'
import userRouter from './routes/user.js'
import paymentRouter from './routes/payment.js'


const app = express()

const PORT = process.env.PORT


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', authRouter, productCategoryRouter, productRouter, modifierRouter, orderRouter, userRouter, paymentRouter)
app.use('/images', express.static('public/images'))

app.get('/', (req, res) => {
    res.send("Test du Beldiz")
})


// app.get('/public/images/:filename', (req, res) => {
//     const file = `public/images/${req.params.filename}`;
//     res.sendFile(path.resolve(file));
//     });
app.get('/public/images/:filename', (req, res) => {
    const filename = path.basename(req.params.filename) 
    const ext = path.extname(filename).toLowerCase()
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']

    if (!allowedExtensions.includes(ext)) {
        return res.status(400).json('Extension non autorisée')
    }

    const filePath = path.join('public', 'images', filename)


    if (!fs.existsSync(filePath)) {
        return res.status(404).json('Fichier introuvable')
    }

    res.sendFile(path.resolve(filePath))
})

app.get('/images', (req, res) => {
    fs.readdir('public/images', (err, files) => {
        if (err) {
        return res.status(500).send({ error: err })
        }
        res.send({ images: files })
    })
})

connectDB()

app.listen(PORT, () => {
    console.log(`Le server tourne sur le port ${PORT}`)
})