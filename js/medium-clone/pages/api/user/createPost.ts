import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import { uid } from 'uid';
import isUnique from '../../../utils/isUnique';
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
    const slugQuery = ``
    await client.create({
      _type: 'userPost',
      user: {
        _type: 'user',
        _ref: id,
      },
      title,
      description,
      slug: {
        current: 'test'
       
      },
      body: [body],
      // mainImage,
      // publishedAt,
    });
  
    // const mutations = [{
    //     delete: {
    //       id: 'rN1qi54kvWKs5FTfdnVwsL',
    //     }
    //   }]
    //   const del = fetch(`https://${config.projectId}.api.sanity.io/v2021-06-07/data/mutate/${config.dataset}`, {
    //     method: 'post',
    //     headers: {
    //       'Content-type': 'application/json',
    //       Authorization: `Bearer ${config.token}`
    //     },
    //     body: JSON.stringify({mutations})
    //   })
    //     .then(response => response.json())
    //     .then(result => console.log(result))
    //     .catch(error => console.error(error))
    //     return res.status(200).json({ del })
  } catch (e) {
    return res.status(500).json({ message: 'Could not submit', e });
  }
  return res.status(200).json({ message: 'post created!' });
}
