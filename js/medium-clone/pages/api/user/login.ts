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
  //password: bcrypt.hashSync(password, 8)
  try {
    const query = `*[_type == 'user' && email == '${email}'] {
        password
    }`
    user = await sanityClient.fetch(query)
    
  } catch (e) {
    return res.status(500).json({ message: 'Could not submit', e });
  }
  return res.status(200).json({ user: user || 'error' });
}
