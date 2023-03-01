const jwt = require('jsonwebtoken')

type User = {
    _id: string, 
    name: string, 
    email: string,
    admin: boolean 
}
export default function signToken(user: User) {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}