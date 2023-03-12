import  { AuthOptions, Session } from "next-auth"
import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import refreshAccessToken from '../../../utils/refreshAccessToken'
export const authOptions:AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.NEXT_SPOTIFY_CLIENT_SECRET!,
      checks: ['state']
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      //Persistent OAuth access token
      //called whenever JWT is created
      if(account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token
        }
      }
      //Returns token if still valid
      if(Date.now() < token.accessTokenExpires) {
        return token
      }
      //Updates expired token
      return refreshAccessToken(token)
    },
    //Send token props to client
    async session({ session, token, user }){
      session.accessToken = token.accessToken
      
      return session
    },
  }
}
export default NextAuth(authOptions)