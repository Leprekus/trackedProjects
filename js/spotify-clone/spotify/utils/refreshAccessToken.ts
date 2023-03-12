import { JWT } from 'next-auth/jwt'
import spotifyWebApi from './SpotifyApi'
const fs = require('fs')
export default async function refreshAccessToken(token:JWT):Promise<JWT> {
    try {
      spotifyWebApi.setAccessToken(token?.accessToken)
      spotifyWebApi.setRefreshToken(token?.refreshToken)
      const { body: refreshedToken } = await spotifyWebApi.refreshAccessToken();
      fs.writeFile('./logs.txt', JSON.stringify({
        message: 'token refreshed',
        refreshedToken
      }))
      return {
        ...token,
        accessToken: refreshedToken.access_token,
        accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
        refreshToken: refreshedToken.refresh_token ?? token.refresh_token //Fallback to previous refresh token
      }
    } catch(error) {
      fs.writeFile('./logs.txt', JSON.stringify({
        message: 'failed to refresh token',
        error
      }))      
      return {
        ...token, 
        error: 'RefreshAccessTokenError'
      }
    }
  }