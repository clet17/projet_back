import User from '../models/User.js'

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('first_name last_name email phone address')

        if (!user) {
        return res.status(404).json('Utilisateur introuvable')
        }

        return res.status(200).json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}

export const updateUser = async (req, res) => {
    const { first_name, last_name, phone, address } = req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { first_name, last_name, phone, address },
        { new: true }
        ).select('first_name last_name email phone address')

        if (!updatedUser) {
        return res.status(404).json('Utilisateur introuvable')
        }

        return res.status(200).json({ message: 'Profil mis à jour', user: updatedUser })
    } catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}
