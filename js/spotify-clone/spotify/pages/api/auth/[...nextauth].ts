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
          refreshToken: account.refresh_token,
          user
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
    async session({ session, token }){
      session.accessToken = token.accessToken
      
      return session
    },
  }
}
export default NextAuth(authOptions)

//"BQAXTzuyZ1uGJximuWAcnocfFZbjjmUXWmD4rwimtXzj4lhqQA_ZfjYZ3q55Dbyl3B-Um5GWdxRyHgTaZUNDx6B_pt34b0Qw3b-GAxBjpj0NFQDpp0C8lVtrsWVbUuHHzW4OPfJpKMyYNefnalH8OgFBpSzTNote6HG0m6g71brIig7RWxg"