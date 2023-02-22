import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Post from '../components/Post'
import { sanityClient, urlFor } from '../sanity'
import { PostProps } from '../typings'
//makes this page server-side rendered
export const getServerSideProps = async() => {
// fetches array of posts with following information
  const query = `*[_type == 'post'] {
    _id, 
    title,
    author -> {
      name, 
      image,
    },
    description, 
    mainImage, 
    slug
  }`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    }
  }
}

interface Props {
  posts: [PostProps]
}

const Home:NextPage<Props> = ({ posts }:Props) => {
  console.log(posts)
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Banner/>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6'>
        {posts.map(post =>(
          <Post
            key={post._id}
            slug={post.slug}
            mainImage={post.mainImage}
            title={post.title}
            description={post.description}
            author={post.author}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
