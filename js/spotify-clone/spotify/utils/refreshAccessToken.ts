import { JWT } from 'next-auth/jwt'

export default async function refreshAccessToken(token:JWT) {
    try {
  
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${new Buffer(process.env.NEXT_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_SPOTIFY_CLIENT_SECRET).toString('base64')}`,
          'Content-Type': "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: token.refresh_token,

        }),
        //json: true

      })
      const refreshedToken = await response.json()
      if(!response.ok) {
        throw refreshedToken
      }
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