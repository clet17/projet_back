export const checkAdmin = async (req, res, next) => {
    const { is_admin } = req.user

    try {
        if (!is_admin) {
        return res.status(403).json('Accès refusé : réservé aux administrateurs')
        }
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json('Erreur serveur')
    }
}

