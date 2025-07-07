import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]


    if (!token){
        return res.status(401).json('Accès refusé : pas de token')
    }

    try{
        const verify = jwt.verify(token, JWT_SECRET)
        if(!verify){
            return res.status(403).json('Accès refusé : mauvais token')
        }
        req.user = verify 
        // console.log(req.user)
        next()
    }
    catch(err){
        console.log(err)
        return res.status(500).json('Internall serv error')
    }

}