import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

// Middleware pour vérifier si l'utilisateur est authentifié via un token JWT
export const authMiddleware = async (req, res, next) => {
  // On récupère le token dans les headers (format : "Bearer token")
  const token = req.headers.authorization?.split(' ')[1]

  // Si aucun token, on bloque l'accès
  if (!token) {
    return res.status(401).json('Accès refusé : pas de token')
  }

  try {
    // Vérification du token avec la clé secrète
    const verify = jwt.verify(token, JWT_SECRET)

    if (!verify) {
      return res.status(403).json('Accès refusé : mauvais token')
    }

    // Si tout est ok, on stocke les infos du token dans req.user
    req.user = verify

    // On passe au middleware suivant ou au contrôleur
    next()
  }
  catch (err) {
    console.log(err)
    return res.status(500).json('Internall serv error')
  }
}
