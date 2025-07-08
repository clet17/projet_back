// Middleware pour vérifier si l'utilisateur est admin
export const checkAdmin = async (req, res, next) => {
  // On récupère is_admin transmis par le middleware d'authentification
  const { is_admin } = req.user

  try {
    // Si l'utilisateur n'est pas admin, on bloque l'accès
    if (!is_admin) {
      return res.status(403).json('Accès refusé : réservé aux administrateurs')
    }

    // Sinon, on continue
    next()
  } catch (err) {
    console.log(err)
    return res.status(500).json('Erreur serveur')
  }
}
