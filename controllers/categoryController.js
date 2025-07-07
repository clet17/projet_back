import ProductCategory from "../models/ProductCategory.js";

export const createProductCategory = async (req, res) => {
  const { name, description } = req.body

  try {
    const imagePath = req.file
      ? `public/images/${req.file.filename}`
      : 'public/images/default.jpeg'

    const newProductCategory = new ProductCategory({
      name,
      description,
      image: imagePath
    })

    await newProductCategory.save()
    res.status(201).json({ message: 'Catégorie créée', newProductCategory })
  } catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}

// 🔍 Obtenir toutes les catégories (publique)
export const getAllProductCategory = async (req, res) => {
    try {
        const productCategory = await ProductCategory.find()
        res.status(200).json(productCategory)
    }
    catch(err){
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

// ✏️ Modifier une catégorie (ADMIN uniquement)
export const updateProductCategory = async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body

    try {
        const updateData = {
            name,
            description
        }

        if (req.file) {
        updateData.image = "public/images/" + req.file.filename
        }

        const updated = await ProductCategory.findByIdAndUpdate(id, updateData, { new: true })

        if (!updated) {
        return res.status(404).json({ message: "Catégorie introuvable" })
        }

        res.status(200).json({ message: "Catégorie mise à jour", updated })
    }
    catch(err){
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

// 🗑️ Supprimer une catégorie (ADMIN uniquement)
export const deleteProductCategory = async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await ProductCategory.findByIdAndDelete(id)
        if (!deleted) {
        return res.status(404).json({ message: "Catégorie introuvable" })
        }

        res.status(200).json({ message: "Catégorie supprimée" })
    } 
    catch(err){
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}