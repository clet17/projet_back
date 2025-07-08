import ProductCategory from "../models/ProductCategory.js"

// Création d’une nouvelle catégorie produit (réservé admin)
export const createProductCategory = async (req, res) => {
  // Récupération des infos dans le body
  const { name, description } = req.body

  try {
    // Si aucune image n'est envoyée, on met une image par défaut
    const imagePath = req.file
      ? `public/images/${req.file.filename}`
      : 'public/images/default.jpeg'

    // Création de la catégorie avec ou sans image
    const newProductCategory = new ProductCategory({
      name,
      description,
      image: imagePath
    })

    await newProductCategory.save()

    // On renvoie un message de confirmation avec la catégorie créée
    res.status(201).json({ message: 'Catégorie créée', newProductCategory })
  } catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}

// Récupération de toutes les catégories (route publique)
export const getAllProductCategory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.find()
    res.status(200).json(productCategory)
  }
  catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}

// Modification d’une catégorie produit (réservé admin)
export const updateProductCategory = async (req, res) => {
  // Récupération de l'id de la catégorie dans les params
  const { id } = req.params
  const { name, description } = req.body

  try {
    const updateData = {
      name,
      description
    }

    // Si une nouvelle image est envoyée, on la remplace
    if (req.file) {
      updateData.image = "public/images/" + req.file.filename
    }

    // Mise à jour de la catégorie
    const updated = await ProductCategory.findByIdAndUpdate(id, updateData, { new: true })

    if (!updated) {
      return res.status(404).json({ message: "Catégorie introuvable" })
    }

    res.status(200).json({ message: "Catégorie mise à jour", updated })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}

// Suppression d’une catégorie produit (réservé admin)
export const deleteProductCategory = async (req, res) => {
  // Récupération de l'id de la catégorie à supprimer
  const { id } = req.params

  try {
    const deleted = await ProductCategory.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Catégorie introuvable" })
    }

    res.status(200).json({ message: "Catégorie supprimée" })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}
