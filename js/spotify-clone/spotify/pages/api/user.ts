// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import spotifyWebApi from '../../utils/SpotifyApi'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const token = await getToken({ 
         req,
         secret: process.env.NEXT_SECRET 
        })
    const request = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token?.accessToken}`
        }
    })
    const currentUser = await request.json()
  return res.status(200).json(currentUser)
}
