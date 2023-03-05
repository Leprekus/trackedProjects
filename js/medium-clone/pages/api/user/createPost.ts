import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import { uid } from 'uid';
const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};
//token is obtained from
//sanity > project > api tab > tokens
const client = createClient(config);
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //these are the contents of the form request
  const { 
    id,
    title,
    description,
    body,
    mainImage,
    publishedAt,
    author,
   } = JSON.parse(req.body);
  try {
    await client.create({
      _type: 'post',
      user: {
        _type: 'user',
        _ref: id,
      },
      title,
      description,
      body,
      mainImage,
      publishedAt,
      slug: uid()
      
    });
  } catch (e) {
    return res.status(500).json({ message: 'Could not submit', e });
  }
  return res.status(200).json({ message: 'post created!' });
}
