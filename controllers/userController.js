import User from '../models/User.js'

// Récupération des informations de l'utilisateur connecté (via le token)
export const getUser = async (req, res) => {
  try {
    // On cherche l'utilisateur par son ID et on ne sélectionne que les infos utiles
    const user = await User.findById(req.user.id).select('first_name last_name email phone address')

    if (!user) {
      return res.status(404).json('Utilisateur introuvable')
    }

    // On renvoie les infos du profil utilisateur
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}

// Mise à jour des informations de l'utilisateur connecté (hors mot de passe)
export const updateUser = async (req, res) => {
  const body = sanitizeInputs(req.body)
  // Récupération des données envoyées dans le body
  const { first_name, last_name, phone, address } = body

  try {
    // On met à jour l'utilisateur en base
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { first_name, last_name, phone, address },
      { new: true }
    ).select('first_name last_name email phone address')

    if (!updatedUser) {
      return res.status(404).json('Utilisateur introuvable')
    }

    // On renvoie un message de confirmation avec les nouvelles infos
    return res.status(200).json({ message: 'Profil mis à jour', user: updatedUser })
  } catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error', err)
  }
}
