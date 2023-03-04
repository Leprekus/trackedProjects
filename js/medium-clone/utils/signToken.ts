import Cookies from 'js-cookie'

const jwt = require('jsonwebtoken')

type User = {
    _id: string, 
    name: string, 
    email: string,
    admin: boolean 
}
export default function signToken(user: User) {
    const stringifiedUser = JSON.stringify(user)
    //set to expire in 7 days
    return Cookies.set('user', stringifiedUser, { expires: 7, secure: true, sameSite: 'strict' })
}

export function getUser<User> () {
    const parsedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null
    return parsedUser
}