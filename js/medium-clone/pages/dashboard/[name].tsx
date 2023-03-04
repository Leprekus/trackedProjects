import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import Header from '../../components/Header'
import UserHeader from '../../components/UserHeader'
import { User } from '../../typings'
import { getUser } from '../../utils/signToken'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const profile: User = getUser()
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
function Name({ profile }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <UserHeader name={profile.user.name}/>
    </div>
  )
}

export default Name