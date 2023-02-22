import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
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
  posts: [Post]
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
      {posts.map(post =>(
        <Link key={post._id} href={`/posts/${post.slug.current}`}>
          <div>
            {post.mainImage && 
              <img src={urlFor(post.mainImage).url()} alt="thumbnail" />
              }
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home
