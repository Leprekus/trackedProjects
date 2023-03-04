import Cookies, { CookieAttributes } from 'js-cookie'
import * as cookie from 'cookie'
import { User } from '../typings'

const jwt = require('jsonwebtoken')


export default function signToken(user: User) {
    const stringifiedUser = JSON.stringify(user)
    //set to expire in 7 days
    return Cookies.set('user', stringifiedUser, { expires: 7, secure: true, sameSite: 'strict' })
}

export function getUser<User> (nextJsContext?:any) {
    if(nextJsContext) {
        const parsedCookie = cookie.parse(nextJsContext)
        return parsedCookie
    }
    const parsedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : null
    return parsedUser
}

export function signOut(isLoggedIn: Function): void {
    isLoggedIn(false)
    Cookies.remove('user')
    console.log('singed out')
}