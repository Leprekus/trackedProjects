# Spotify Clone
The purpose of this project is to recreate Spotify's complete functionality using the Nextjs framework. I also plan on adding some custom features, but at the time of writing I still do not clearly know what I would like to add. 

## Technologies used

* NEXTJS
* NEXT-AUTH
* REACT
* TS
* JWT
* Spotify Web API JS

## Next-auth

Wrapping the the app in SessionProvider keeps the app in sync with the server.

The "useSession" hook is used to check whether a user is authetnticated.

[...nextauth] file takes in secret and callback paramters. 
The secret can be generated using ```$ openssl rand -base64 32```. The callback functions send to token to the client, and lets it know that a user has been authenticated. 


## Next Auth Typings

token and session parameters in the authProvider callback do not have
the accessToken property. They need to be declared like so:
import NextAuth, { DefaultSession } from "next-auth"

```declare module "next-auth" {
  /**
   * Returned by 'useSession', 'getSession' and received as a prop on the 'SessionProvider' React Context
   */

  interface Session {
    accessToken: string,
  }
}
declare module "next-auth" {
  /**
   * Returned by 'useSession', 'getSession' and received as a prop on the 'SessionProvider' React Context
   */

  interface JWT {
    accessToken: string,
  }
}```
