import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
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
      <button className='bg-green-600 py-2 px-4 text-white rounded-sm active:bg-green-700'> Create post</button>
      {posts ? posts : <h2 className='text-2xl text-gray-400 font-semibold'>No posts over here...</h2>}
    </div>
  )
}

export default Name