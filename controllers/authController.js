import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { sanitizeInputs } from "../utils/sanitizeInputs.js";

//Récupération de la clé secrette pour signer le token JWT
const JWT_SECRET = process.env.JWT_SECRET

//Fonction pour vérifier la conformité du MDP , 12 caractères minimum , une majuscule , une minuscule , 1 chiffre  
const isPasswordValid = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/
  return regex.test(password)
}

export const createUser = async (req, res) => {
    // Nettoyage des données envoyées par l'utilisateur
    const body = sanitizeInputs(req.body)

    //récupération des informations dans le body de la requette
    const { first_name, last_name, email, password, phone, address } = body
    

    try {
        //Vérification de conformité du MDP
        if (!isPasswordValid(password)) {
            return res.status(400).json('Mot de passe trop faible. Il faut au moins 12 caractères, une majuscule, une minuscule et un chiffre.')
        }

        //On vérifie si l'email n'est pas déja utilisé 
        const emailVerification = await User.findOne({email : email})
        if(emailVerification){
            return res.status(409).json('Email déja utilisé')
        }

        //Hash du MDP
        const saltPassword = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltPassword)

        
        //Création du nouvel utilisateur
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
            address
        })

        await newUser.save()

        //Génération du token JWT qui contiendra l'id de l'utilisateur ainsi que l'information de si il est admin ou pas
        const token = jwt.sign(
            { id: newUser._id, is_admin: newUser.is_admin },
            JWT_SECRET
        )

        // On renvoie Un message de confirmation ainsi que le token dans la réponse
        return res.status(201).json({ message: `Bienvenue au Beldiz ${first_name}`, token })

    } 
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}


export const loginUser = async (req, res) => {
    const body = sanitizeInputs(req.body)
    //récupération des informations dans le body de la requette
    const {email, password} = body

    try{
        //Vérification de l'existance de l'adresse mail
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json('Email ou MDP invalide')
        }
        
        //Vérification de la conformité du MDP
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(401).json('Email ou MDP invalide')
        }
        
        //Génération du token JWT qui contiendra l'id de l'utilisateur ainsi que l'information de si il est admin ou pas
            // console.log('JWT_SECRET :', JWT_SECRET)
        const token = jwt.sign(
            { id: user._id, is_admin: user.is_admin },
            JWT_SECRET
        )
        // On renvoie Un message de confirmation ainsi que le token dans la réponse
        return res.status(200).json({ message: `Bienvenue au Beldiz ${user.first_name}`, token })
    }
   
    catch(err){
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}