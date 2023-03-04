import Cookies from 'js-cookie';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { sanityClient } from '../sanity';
import signToken, { getUser } from '../utils/signToken';

type Credentials = {
  email: string, 
  password: string,
}
export default function login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<Credentials>();
  const profile = getUser()
  useEffect(() => {
    if(profile) {
      setIsLoggedIn(true)
   
    }
    if(!profile) {
      setIsLoggedIn(false)
    }
  }, [profile])

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login: SubmitHandler<Credentials> = async (data) => {
    await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          switch (res.status) {
            case 404:
              setError('email', {
                message: 'email not registered'
              })
              break;
            case 409:
              setError('password', {
                message: 'incorrect password'
              })
              break;
            default:
            throw new Error('Bad Response', {
              cause: { res },
            });
          }
        }
        setIsLoggedIn(true)
        return res.json();
      })
      .then((data) => signToken(data))
      .catch((e) => {
        console.log({ e })
      });
  
    }
  return (
    <div>
    <form action="" onSubmit={handleSubmit(login)} className='flex flex-col w-full md:w-1/2 mx-auto space-y-2 mt-32'>
        <h1 className='text-2x'>{isLoggedIn ? `Welcome Back ${profile?.user?.name }`: 'Login'}</h1>
        <label htmlFor="">Email</label>
        <input 
        {...register('email', { required: 'Please type in your email' })}
        className='shadow shadow-gray-300 rounded px-3 py-0.5' type="text" placeholder='example@mail.com'/>
        {errors.email && (
          <p className='text-sm text-red-500 pt-2'>{errors.email?.message}</p>
        )}

        <label htmlFor="">Password</label>
        <input 
        {...register('password', { required: 'Please type in your password' })}
        className='shadow shadow-gray-300 rounded px-3 py-0.5' type="password" placeholder='Password'/>
        {errors.password && (
          <p className='text-sm text-red-500 pt-2'>{errors.password?.message}</p>
        )}
    <div className='space-x-3 pt-2'>
        <Link href='/' className='py-1 px-5 border text-green-600 rounded-full w-fit active:bg-gray-200'>Home</Link>
        <input type='submit' className='py-1 px-5 bg-green-600 text-white rounded-full w-fit cursor-pointer focus:bg-green-700' value='Sign in'/>
    </div>
    </form>
</div>
  )
}
