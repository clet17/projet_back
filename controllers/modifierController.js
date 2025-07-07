import Modifier from "../models/Modifier.js"

export const createModifier = async (req, res) => {
    const { name, type, price } = req.body

    try {
        const imagePath = req.file
        ? `public/images/${req.file.filename}`
        : 'public/images/default.jpeg'

        const newModifier = new Modifier({
            name,
            type,
            price,
            image: imagePath
        })

        await newModifier.save()
        return res.status(201).json({ message: 'Modificateur créé', newModifier })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

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

export const updateModifier = async (req, res) => {
    const { id } = req.params
    const { name, type, price } = req.body

    try {
        const updateData = {
            name,
            type,
            price
        }

        if (req.file) {
        updateData.image = 'public/images/' + req.file.filename
        }

        const updated = await Modifier.findByIdAndUpdate(id, updateData, { new: true })

        if (!updated) {
        return res.status(404).json('Modificateur introuvable')
        }

        return res.status(200).json({ message: 'Modificateur mis à jour', updated })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

export const deleteModifier = async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await Modifier.findByIdAndDelete(id)

        if (!deleted) {
        return res.status(404).json('Modificateur introuvable')
        }

        return res.status(200).json({ message: 'Modificateur supprimé' })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}
