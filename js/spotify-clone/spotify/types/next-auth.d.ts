import NextAuth, { DefaultSession } from "next-auth"


declare module "next-auth" {
  interface Session {
    accessToken: string,
    refreshToken: string, 
    user: string
  }
}
declare module "next-auth" {
  interface Account {
    expires_in: number,
  }
}

