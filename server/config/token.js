import jwt from 'jsonwebtoken'

export const genToken = async (id) => {
    try{
        const token = jwt.sign({id}, process.env.JWT_secret, {expiresIn:'30d'})
        return token
    }catch(error){
        console.error(error)
        throw new Error("Error in generating token")
    }
}