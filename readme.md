# Projet BELDIZ

Application web de gestion de restaurant rapide avec back-office administrateur, paiement en ligne, et affichage des produits côté client.

## Fonctionnalités

- Authentification sécurisée (inscription, connexion, JWT, bcrypt)
- CRUD complet :
  - Catégories de produits
  - Produits (avec image et modificateurs)
  - Modificateurs
- Gestion des commandes :
  - Pas de suppression
  - Modification uniquement du statut (par l’admin)
- Les utilisateurs ne peuvent pas être supprimés (fonctionnalité potentielle en v2)
- Paiement via Stripe (mode test uniquement)
- Upload d’images (avec image par défaut si non fourni)
- Sécurité via middlewares (authentification + rôle admin)

## Technologies utilisées

- Backend : Node.js + Express.js
- Base de données : MongoDB Atlas
- Paiement : Stripe (environnement test)
- Upload d’image : Multer (stockage local temporaire)
- Déploiement backend : Railway  
  https://projetback-production-d8bd.up.railway.app
- Déploiement frontend : Netlify
- Frontend : React + Vite



## Installation locale

git clone https://github.com/clet17/projet_back
npm install
npm run dev
rajouter "type": "module" dans le package.json 

## Dépendances

- express
- mongoose
- bcryptjs
- jsonwebtoken
- multer
- dotenv
- stripe
- cors
- uuid
- nodemon (dev)



## Remarques

- Le stockage local d’image est effacé à chaque redémarrage sur Railway.
- Stripe est utilisé en mode test (aucune transaction réelle).
- Le rôle admin est vérifié côté back via middleware dédié.
- L’architecture suit un modèle clair et maintenable.