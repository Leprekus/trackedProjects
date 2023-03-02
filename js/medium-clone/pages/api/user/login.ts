import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../../sanity';
const bcrypt = require('bcrypt');

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //these are the contents of the request
   const { email, password } = JSON.parse(req.body);
  let user
  try {
    const queryString = `*[_type == 'user' && email == '${email.toLowerCase()}'] {
        password
    }`
    const query = await sanityClient.fetch(queryString)
    if(query.length < 1) return res.status(404).json({ message: 'email not registered' })
    return res.status(200).json({ query: query.length })
    
} catch (e) {
    return res.status(500).json({ message: 'Could not submit', e });
  }
    return res.status(200).json({ message: 'login successful' })
}
