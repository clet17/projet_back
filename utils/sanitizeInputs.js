// On importe le module sanitize-html pour nettoyer les chaînes potentiellement dangereuses
import sanitizeHtml from 'sanitize-html'

// Fonction qui prend un objet (souvent req.body) et nettoie chaque champ de type string
export const sanitizeInputs = (inputObject) => {
  const sanitized = {}

  // On parcourt chaque champ de l'objet
  for (const key in inputObject) {
    const value = inputObject[key]

    // Si le champ est une chaîne de caractères, on le nettoie pour enlever balises ou scripts
    if (typeof value === 'string') {
      sanitized[key] = sanitizeHtml(value, {
        allowedTags: [],         // Aucune balise HTML autorisée
        allowedAttributes: {}    // Aucun attribut HTML autorisé
      })
    } else {
      // Si ce n'est pas une chaîne, on le garde tel quel (ex: number, array...)
      sanitized[key] = value 
    }
  }

  // On retourne l'objet nettoyé
  return sanitized
}
