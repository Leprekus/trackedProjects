import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { sanityClient, urlFor } from '../../sanity'
import { PostProps } from '../../typings'
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
    'comments': * [
      _type == 'comment' && 
      post._ref == ^.id && 
      approved == true],
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
    }
  }
}
interface Props {
  post:PostProps
}
function slug({ post }:Props) {
  console.log(post)
  return (
    <div>
      <div>
        <img src={post.mainImage} alt="" />
      </div>
      <h1 className='text-6xl'>{post.title}</h1>
    </div>
  )
}

export default slug