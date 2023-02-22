import Link from 'next/link';
import React from 'react';
import { urlFor } from '../sanity';
import { PostProps } from '../typings';

interface Props{
  slug: {
    current: string
  }, 
  mainImage:string, 
  title: string,
  description: string, 
  author: {
    name: string,
    image: string
  }
}
function Post({slug, mainImage, title, description, author}: Props ) {
  return (
    <Link href={`/posts/${slug.current}`}>
      <div className='group border rounded-lg overflow-hidden'>
        {mainImage && (
          <img
            className='h-60 w-full object-cover group-hover:scale-105 transition-transform ease-in-out'
            src={urlFor(mainImage).url()}
            alt='post thumbnail'
          />
        )}
        <div className='flex justify-between p-5 bg-white'>
          <div>
            <p className='text-lg font-bold'>{title}</p>
            <p className='text-xs'>{`${description} by ${author.name}`}</p>
          </div>
          <img
            className='h-12 w-12 rounded-full'
            src={urlFor(author.image).url()}
            alt='author thumbnail'
          />
        </div>
      </div>
    </Link>
  );
}

export default Post;
