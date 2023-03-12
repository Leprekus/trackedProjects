import  { AuthOptions, Session } from "next-auth"
import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
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
    async jwt({ token, account }) {
      //Persistent OAuth access token
      //called whenever JWT is created
      if(account) {
        token.accessToken = account.access_token!
      }
      return token
    },
    //Send token props to client
    async session({ session, token, user }){
      session.accessToken = token.accessToken
      
      return session
    }
  }
}
export default NextAuth(authOptions)