import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
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
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (e) {
    return res.status(500).json({ message: 'Could not submit', e });
  }
  return res.status(200).json({ message: 'comment submitted!' });
}
