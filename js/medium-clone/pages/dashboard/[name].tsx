import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import Header from '../../components/Header'
import Post from '../../components/Post'
import UserHeader from '../../components/UserHeader'
import { sanityClient } from '../../sanity'
import { User } from '../../typings'
import { getUser } from '../../utils/signToken'
import { PostData } from '../../typings'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const profileData = getUser(context.req.headers.cookie)
  const user:User = profileData ? JSON.parse(profileData?.user) : null

  if(!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const query = `*[ _type == 'userPost' && user._ref == '${user.id}']  {
    _id, 
    title,
    user -> {
      name, 
      image,
    },
    description, 
    mainImage, 
    slug,
    _createdAt
  }`
  const posts: Array<PostData> = await sanityClient.fetch(query) ?? [] 
  //const posts = await postData.json() ?? []
  //const posts = await 
  return {
    props: {
      user,
      posts,
    } 
  }
  
}

const CreatePostForm = dynamic(() => import('../../components/CreatePostForm'), {
  ssr: false
})
function Name({ user, posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className='bg-slate-50'>
      <UserHeader name={user.name}/>
      <CreatePostForm user={user}/>
      {posts.length < 1 ? <h2 className='text-2xl text-gray-400 font-semibold my-12 mx-auto w-fit'>Your Posts</h2>
       :       <h2 className='text-2xl text-gray-400 font-semibold my-12 mx-auto w-fit'>No posts over here...</h2>}
      <div className='flex justify-center flex-wrap w-full'>
        {posts.map((data:PostData, i:number) =>(
          <Post 
          key={`data.id_${i}`}
          slug={data.slug}
          _id={data.id}
          _createdAt={data.createdAt}
          title={data.title}
          user={user}
          description={data.description}
          mainImage={data.mainImage}
          
          />
        ))}
      </div>
    </div>
  )
}

export default Name