import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import CreatePostForm from '../../components/CreatePostForm'
import Header from '../../components/Header'
import UserHeader from '../../components/UserHeader'
import { User } from '../../typings'
import { getUser } from '../../utils/signToken'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const profile: User = getUser(context.req.headers.cookie)
  //const posts = await 
  if(!profile) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  return {
    props: {
      profile,
    } 
  }
  
}
function Name({ profile, posts }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const user = JSON.parse(profile.user)
 
  return (
    <div>
      <UserHeader name={user.name}/>
      <CreatePostForm/>
      {posts ? <h2 className='text-2xl text-gray-400 font-semibold my-12 mx-auto w-fit'>Your Posts</h2>
       :       <h2 className='text-2xl text-gray-400 font-semibold my-12 mx-auto w-fit'>No posts over here...</h2>}
      <div className='flex justify-center flex-wrap w-full'>
        {posts}
      </div>
    </div>
  )
}

export default Name