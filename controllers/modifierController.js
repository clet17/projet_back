import Modifier from "../models/Modifier.js"

// Création d’un nouveau modificateur (option, sauce ou supplément)
export const createModifier = async (req, res) => {
  // Récupération des infos dans le body
  const { name, type, price } = req.body

  try {
    // Si aucune image n’est envoyée, on met une image par défaut
    const imagePath = req.file
      ? `public/images/${req.file.filename}`
      : 'public/images/default.jpeg'

    // Création du modificateur
    const newModifier = new Modifier({
      name,
      type,
      price,
      image: imagePath
    })

    await newModifier.save()

    // On renvoie un message de confirmation avec le modificateur créé
    return res.status(201).json({ message: 'Modificateur créé', newModifier })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}

// Récupération de tous les modificateurs
export const getAllModifiers = async (req, res) => {
  try {
    const modifiers = await Modifier.find()
    return res.status(200).json(modifiers)
  }
  catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}

// Mise à jour d’un modificateur (réservé admin)
export const updateModifier = async (req, res) => {
  // Récupération de l'id du modificateur à modifier
  const { id } = req.params
  const { name, type, price } = req.body

  try {
    const updateData = {
      name,
      type,
      price
    }

    // Si une nouvelle image est envoyée, on la remplace
    if (req.file) {
      updateData.image = 'public/images/' + req.file.filename
    }

    // Mise à jour dans la base de données
    const updated = await Modifier.findByIdAndUpdate(id, updateData, { new: true })

    if (!updated) {
      return res.status(404).json('Modificateur introuvable')
    }

    // On renvoie un message de confirmation avec l’objet modifié
    return res.status(200).json({ message: 'Modificateur mis à jour', updated })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}

// Suppression d’un modificateur (réservé admin)
export const deleteModifier = async (req, res) => {
  // Récupération de l'id du modificateur à supprimer
  const { id } = req.params

  try {
    const deleted = await Modifier.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json('Modificateur introuvable')
    }

    // On renvoie un message de confirmation
    return res.status(200).json({ message: 'Modificateur supprimé' })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}
