import { JWT } from 'next-auth/jwt'
import spotifyWebApi from './SpotifyApi'

export default async function refreshAccessToken(token:JWT) {
    try {
      spotifyWebApi.setAccessToken(token?.accessToken)
      spotifyWebApi.setRefreshToken(token?.refreshToken)
      const { body: refreshedToken } = await spotifyWebApi.refreshAccessToken();
      return {
        ...token,
        accessToken: refreshedToken.access_token,
        accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
        refreshToken: refreshedToken.refresh_token ?? token.refresh_token //Fallback to previous refresh token
      }
    } catch(error) {
      return {
        ...token, 
        error: 'RefreshAccessTokenError'
      }
    }
  }