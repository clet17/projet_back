import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

// Configuration du stockage des fichiers avec multer
const storage = multer.diskStorage({
  // Dossier de destination pour les fichiers uploadés
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },

  // Nom du fichier généré automatiquement avec un identifiant unique
  filename: function (req, file, cb) {
    // On récupère l'extension du fichier d'origine (.jpg, .png, etc.)
    const ext = path.extname(file.originalname).toLowerCase()

    // On génère un nom unique basé sur le nom du champ et un UUID
    const uniqueName = `${file.fieldname}-${uuidv4()}${ext}`

    cb(null, uniqueName)
  }
})

// Export du middleware multer prêt à être utilisé dans les routes
export const upload = multer({ storage: storage })
