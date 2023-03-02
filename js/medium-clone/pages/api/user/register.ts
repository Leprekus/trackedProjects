import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import signToken from '../../../utils/signToken';
import { sanityClient } from '../../../sanity';
const bcrypt = require('bcrypt');
const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};
//token is obtained from
//sanity > project > api tab > tokens
const client = createClient(config);
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //these are the contents of the request
  const { name, username, email, password } = JSON.parse(req.body);
  const tokenWithWriteAccess = process.env.SANITY_USER_TOKEN;
  let data;
  let isRegistered
  try {
    const query = `*[_type == 'user' && email == '${email}' && true] {
        email
      }`
    isRegistered = await sanityClient.fetch(query)
    if(isRegistered.length > 0) return res.status(409).json({ message: 'Email already registered' })

    data = await client.create({
      _type: 'user',
      name,
      username,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 8),
      admin: false,
    });
  } catch (e) {
    return res.status(500).json({ message: 'Could not submit', e });
  }
  return res.status(200).json({ message: 'account created!' });
}
