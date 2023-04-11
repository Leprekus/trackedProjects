import { JWT } from 'next-auth/jwt';

export default async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
      const response = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: token.refreshToken as string,
        }),
      });
  
      const refreshedTokens = await response.json();
  
      if (!response.ok) {
        throw refreshedTokens;
      }
  
      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      };
    } catch (error) {
      console.log(error);
  
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }
  