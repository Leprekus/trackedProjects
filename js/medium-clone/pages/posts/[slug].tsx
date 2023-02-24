import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { PostProps } from '../../typings'
import PortableText from 'react-portable-text'
import Comments from '../../components/Comments'
//prebuilds routes in advance
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
  const query = `*[_type =='post' && slug.current == $slug][0]{
    _id, 
    _createdAt, 
    title, 
    author -> {
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
    revalidate: 60, //updates cached version after 60 seconds
  }
}
interface Props {
  post:PostProps
}
function Slug({ post }:Props) {
  console.log(post)
  return (
    <div>
      <Header/>
      <img 
      className='w-full h-40 object-contain'
      src={urlFor(post.mainImage)}
      alt="banner" />

      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>{post.description}</h2>
        
        <div className='flex items-center space-x-2'>
          <img 
          className='h-10 w-10 rounded-full'
          src={urlFor(post.author.image)} 
          alt="" />
          <p className='font-extralight text-sm'>Blog post by <span className='text-green-600'>{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}</p>
        </div>
        <div className='mt-10'>
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
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
          />
        </div>
      </article>
      <hr className='mw-w-lg my-5 mx-auto border border-yellow-500'/>
      <Comments post={post}/>
    </div>
  )
}

export default Slug