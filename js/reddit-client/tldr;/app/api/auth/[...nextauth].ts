import RedditProvider from 'next-auth/providers/reddit';
import NextAuth from 'next-auth/next';
import { JWT } from 'next-auth/jwt';
import { Account, Session, User } from 'next-auth';
import refreshAccessToken from '../../utils/refreshAccessToken';

export default NextAuth({
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: {
        params: {
          duration: 'permanent',
        },
      },
    }),
  ],
  callbacks: {
    async jwt(token: JWT, user: User, account: Account): Promise<JWT> {
      if (user && account) {
        //access token
        //only upated props are returned
        return {
          accessToken: account.accessToken,
          accessTokenExpires:
            Date.now() + (account.expires_in as number) * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session(session:Session, token: JWT) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
  },
});
