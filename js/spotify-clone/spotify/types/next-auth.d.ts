import NextAuth, { DefaultSession } from "next-auth"


declare module "next-auth" {
  interface Session {
    accessToken: string,
    user: string
  }
}
declare module "next-auth" {
  interface Account {
    expires_in: number,
  }
}

