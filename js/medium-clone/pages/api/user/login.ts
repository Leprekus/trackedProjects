import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../../sanity';
import bcrypt from 'bcrypt';

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
    //checks that account exists
    if(query.length < 1) return res.status(404).json({ message: 'email not registered' })
    //checks that passwords match
    const queriedPassword = query[0].password
    const passwordsMatch = bcrypt.compareSync(password, queriedPassword)
    if(!passwordsMatch) return res.status(409).json({ message: 'passwords do not match' })
} catch (e) {
    return res.status(500).json({ message: 'Could not submit', e });
  }
    return res.status(200).json({ message: 'login successful' })
}
