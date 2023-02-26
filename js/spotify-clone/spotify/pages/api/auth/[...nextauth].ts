import NextAuth from 'next-auth/next'
import SpotifyProvider from 'next-auth/providers/spotify'
import SpotifyApi, { LOGIN_URL } from '../../../lib/spotify'
import { Account, Token, User } from '../../../typings'
type JWT = {
    token: Token,
    user: User,
    account: Account
}

type Session = {
    session: {
        expires: string, 
        user: User
    },
    token: Token
}

async function refreshAccessToken(token: Token) {
    try {
        SpotifyApi.setAccessToken(token.accessToken)
        SpotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshedToken } = await SpotifyApi.refreshAccessToken()
        console.log('refreshed token: '), refreshedToken

        return {
            ...token, 
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }
    } catch(e) {
        console.log(e)
        return {
            ...token, 
            error: 'Refresh token error'
        }
    }
}
export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.NEXT_SPOTIFY_CLIENT_SECRET!,
            authorization: LOGIN_URL
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, account, user}: JWT) {
            
            //initial sign in
            if(account && user) {
                return {
                    ...token, 
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId ,
                accessTokenExpires: account.expires_at! * 1000,
                }
            }
            //return token if not expired
            if(Date.now() < token.accessTokenExpires) {
                return token 
            }

            //refresh token 
            return await refreshAccessToken(token)
        },
        async session({ session, token }: Session) {
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.userName = token.username

            return session
        },
    },
})
