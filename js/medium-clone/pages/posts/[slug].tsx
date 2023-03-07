import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { PostProps } from '../../typings'
import PortableText from 'react-portable-text'
import Comments from '../../components/Comments'

import userPNG from '../../assets/user.png'
import blogPlaceholder from '../../assets/placeholder-image.png'
import dynamic from 'next/dynamic'

// const PortableText = dynamic(() => import('react-portable-text'), {
//   ssr: false
// })
// const Header = dynamic(() => import('../../components/Header'), {
//   ssr: false
// })
//prebuilds routes
export const getStaticPaths:GetStaticPaths = async () => {
  const query = `*[_type == 'post'] {
    _id, 
    slug {
      current
    }
  }`
  const posts = await sanityClient.fetch(query)
  //returns an array of paths
  const paths = posts.map((post:PostProps) => ({
    params: {
      slug: post.slug.current,
      //prevents showing a 404 if page does not exist
      fallback: 'blocking'
    }
  }))
  return {
    paths,
    fallback: 'blocking'
  }
}

//getStaticPaths MUST be used with getStaticProps
export const getStaticProps:GetStaticProps = async ({ params }) => {
  //$slug acts as a placeholder
  //res is an array and [0] returns first item
  const query = `*[_type =='userPost' && slug.current == $slug][0]{
    _id, 
    _createdAt, 
    title, 
    user -> {
      name, 
      image, 
    }, 
    'comments': *[
      _type == 'comment' && 
      post._ref == ^._id && 
      approved == true
    ],
      description,
      mainImage, 
      slug, 
      body
  }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug
  })

  if(!post) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      post,
    },
    revalidate: 120, //updates cached version after 60 seconds
  }
}
interface Props {
  post:PostProps
}
function Slug({ post }:Props) {
  console.log(typeof post.body)
  return (
    <div>
      <Header/>
      <img 
      className='w-full h-40 object-contain'
      src={post.mainImage !== null ? urlFor(post.mainImage).toString() : blogPlaceholder.src}
      alt="banner" />

      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>
        
        <div className='flex items-center space-x-2'>
          <img 
          className='h-10 w-10 rounded-full'
          src={post.user.image !== null ? urlFor(post.mainImage).toString() : userPNG.src} 
          alt="" />
          <p className='font-extralight text-sm'>Blog post by <span className='text-green-600'>{post.user.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}</p>
        </div>
        <div className='mt-10'>
          {/* <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body!}
            //serializers are used to dictate how the HTML is parsed
            serializers={{
              h1: (props: any) => (
                <h1 className='text-2xl font-bold my-5'{ ...props }/>
              ),
              h2: (props: any) => (
                <h1 className='text-xl font-bold my-5'{ ...props }/>
              ),
              li: ({ children }: any) => (
                <li className='ml-4 list-disc'>{ children }</li>
              ),
              ul: ({ href, children }: any) => (
                <a href={ href } className='text-blue-500 hover:underline'>{ children }</a>
              )
            }}
          /> */}
          <div dangerouslySetInnerHTML={{__html: post.body?.toString()!}}></div>
        </div>
      </article>
      <hr className='mw-w-lg my-5 mx-auto border border-yellow-500'/>
      <Comments post={post}/>
      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto
      shadow shadow-neutral-300 space-y-2'>
        
        <h3 className='text-4xl'>Comments</h3>
        <hr className='pb-2'/>
        {post.comments!.map(comment => (
          <div key={comment._id} className='py-2'>
            <p>
              <span className='text-green-600'>
                {comment.name}:
            </span> {comment.comment}</p>
            <p className='text-xs text-gray-500'>Published: {new Date(comment._createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slug