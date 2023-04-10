import Link from 'next/link';
import React from 'react';
import { urlFor } from '../sanity';
import { PostProps } from '../typings';
import userPNG from '../assets/user.png'
import blogPlaceholder from '../assets/placeholder-image.png'
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
function Post({slug, mainImage, title, description, user, _id, _createdAt}: PostProps ) {

  return (
    <Link href={`/posts/${slug.current}`} id={_id}>
      <div className='group border rounded-lg overflow-hidden'>
       
          {/* <img
            className='h-60 w-full object-cover group-hover:scale-105 transition-transform ease-in-out'
            src={mainImage !== null ? urlFor(mainImage).url() : blogPlaceholder.src}
            alt='post thumbnail'
          /> */}
        
        <div className='flex justify-between p-5 bg-white'>
          <div>
            <p className='text-lg font-bold'>{title}</p>
            <p className='text-xs'>{`${description} by ${user.name}`}</p>
          </div>
          {/* <img
            className='h-12 w-12 rounded-full'
            src={mainImage !== null ? urlFor(user.image).url() : userPNG.src}
            alt='author thumbnail'
          /> */}
        </div>
      </div>
    </Link>
  );
}

export default Post;
