import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import signToken from '../../../utils/signToken';
import { sanityClient } from '../../../sanity';
const bcrypt = require('bcrypt');

interface Email {
  email: string
}
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
  let { name, username, email, password } = JSON.parse(req.body);
  
  const lowerCaseEmail = email.toLowerCase()

  let user;
  let userId;
  try {
    const query = `*[_type == 'user' && email == '${lowerCaseEmail}' && true] {
        email
      }`
    const emailArray: Array<Email> = await sanityClient.fetch(query)
    const isRegistered = emailArray.some(({ email }) => email.includes(lowerCaseEmail))
    if(isRegistered) return res.status(409).json({ message: 'Email already registered' })
    
    await client.create({
      _type: 'user',
      name,
      username,
      email: lowerCaseEmail,
      password: bcrypt.hashSync(password, 8),
      admin: false,
    });
    const userIdQuery = `*[_type == 'user' && email == '${lowerCaseEmail}'] {
      _id,
    
  }`
  userId = await sanityClient.fetch(userIdQuery)

  } catch (e) {
    return res.status(500).json({ message: 'Could not submit', e });
  }
  user = {
    id: userId[0]._id,
    name, 
    lowerCaseEmail
   
  }
  return res.status(200).json({ user });
}
