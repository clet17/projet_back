import mongoose from "mongoose"
import 'dotenv/config'

// On récupère l'URL de connexion MongoDB depuis la variable d'environnement
const MONGO_DB_URI = process.env.MONGO_DB_URI

// Fonction de connexion à la base de données
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI)
    console.log('Connecté à la DB')
  }

  catch (err) {
    // Si erreur de connexion, on affiche l'erreur et on coupe le serveur
    console.error(`Mongo DB co error : ${err}`)
    process.exit(1)
  }
}

export default connectDB
