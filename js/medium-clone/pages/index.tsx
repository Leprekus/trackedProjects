import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
//makes this page server-side rendered
export const getServerSideProps = async() => {
//fetches array of posts with following information
  const query = `*[_type == 'post] {
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
      posts
    }
  }

}

const Home: NextPage = (props) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Banner/>
    </div>
  )
}

export default Home
