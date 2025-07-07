import Product from "../models/Product.js"

export const createProduct = async (req, res) => {
    const { name, description, ingredients, allergens, price, available, category, modifiers } = req.body

    try {
        const imagePath = req.file
        ? `public/images/${req.file.filename}`
        : 'public/images/default.jpeg'

        const newProduct = new Product({
            name,
            description,
            ingredients,
            allergens,
            price,
            available,
            category,
            image: imagePath,
            modifiers: modifiers ? modifiers.split(',') : []
        })

        await newProduct.save()
        return res.status(201).json({ message: 'Produit créé', newProduct })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category')
        return res.status(200).json(products)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findById(id)
        .populate('category')
        .populate('modifiers')

        if (!product) {
        return res.status(404).json('Produit introuvable')
        }

        return res.status(200).json(product)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, description, ingredients, allergens, price, available, category, modifiers } = req.body

    try {
        const updateData = {
            name,
            description,
            ingredients,
            allergens,
            price,
            available,
            category,
            modifiers: modifiers ? modifiers.split(',') : []
        }

        if (req.file) {
        updateData.image = 'public/images/' + req.file.filename
        }

        const updated = await Product.findByIdAndUpdate(id, updateData, { new: true })

        if (!updated) {
        return res.status(404).json('Produit introuvable')
        }

        return res.status(200).json({ message: 'Produit mis à jour', updated })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await Product.findByIdAndDelete(id)

        if (!deleted) {
        return res.status(404).json('Produit introuvable')
        }

        return res.status(200).json({ message: 'Produit supprimé' })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

