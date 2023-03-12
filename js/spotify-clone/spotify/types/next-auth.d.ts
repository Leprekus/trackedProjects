import NextAuth, { DefaultSession } from "next-auth"


declare module "next-auth" {
  interface Session {
    user: {
      username: string
    } & DefaultSession['user'],
    accessToken: string,
    refreshToken: string, 
    user: string,
    error?:string,
  }
}
declare module "next-auth" {
  interface Account {
    expires_in: number,
  }
}

