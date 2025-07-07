import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

const isPasswordValid = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/
  return regex.test(password)
}

export const createUser = async (req, res) => {
    const { first_name, last_name, email, password, phone, address } = req.body
    
    

    try {
        if (!isPasswordValid(password)) {
            return res.status(400).json('Mot de passe trop faible. Il faut au moins 12 caractères, une majuscule, une minuscule et un chiffre.')
        }


        const emailVerification = await User.findOne({email : email})
        if(emailVerification){
            return res.status(409).json('Email déja utilisé')
        }

        const saltPassword = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltPassword)

        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
            address
        })

        await newUser.save()

        const token = jwt.sign(
            { id: newUser._id, is_admin: newUser.is_admin },
            JWT_SECRET
        )
        return res.status(201).json({ message: `Bienvenue au Beldiz ${first_name}`, token })

    } 
    catch (err) {
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}


export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json('Email ou MDP invalide')
        }
        
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(401).json('Email ou MDP invalide')
        }

        // console.log('JWT_SECRET lors de la génération:', JWT_SECRET)
        const token = jwt.sign(
            { id: user._id, is_admin: user.is_admin },
            JWT_SECRET
        )
        return res.status(200).json({ message: `Bienvenue au Beldiz ${user.first_name}`, token })
    }
   
    catch(err){
        console.log(err)
        return res.status(500).json('Internall serv error', err)
    }
}