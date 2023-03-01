import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface UserForm {
  name: string;
  username: string;
  email: string;
  password: string;
  matchPassword: string;
  isAdmin: boolean;
}
export default function register() {
  //import userInfo <- has info on whether user is logged in
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm<UserForm>();


  const [submitted, setSubmited] = useState(false);
  const createUser: SubmitHandler<UserForm> = async (data) => {
    await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          switch(res.status){
            case 409:
              setError('email', {
                message: 'Email is already in use'
              })
              console.log(res)
              break;
            default:
            throw new Error('Bad Response', {
              cause: { res },
            });
          }
        }
        setSubmited(true);
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((e) => {
        setSubmited(false);
        console.log(e)
      });
  };
  const passwordRef = useRef({});
  passwordRef.current = watch('password', '');
  return (
    <div>
      <form
        onSubmit={handleSubmit(createUser)}
        action=''
        className='flex flex-col max-w-sm md:w-1/2 mx-auto space-y-2 mt-32 p-10'
      >
        <h1 className='text-2xl'>
          {submitted ? 'Account Created Successfully!' : 'Register'}
        </h1>
        <label htmlFor=''>Name</label>
        <input
          {...register('name', { required: true })}
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='text'
          placeholder='Johnny Appleseed'
        />
        {errors.name && (
          <p className='text-sm text-red-500 pt-2'>
            - Please Include your Name
          </p>
        )}

        <label htmlFor=''>Username</label>
        <input
          {...register('username', { required: 'Please choose a username' })}
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='text'
          placeholder='Appleseed'
        />
        {errors.username && (
          <p className='text-sm text-red-500 pt-2'>
            - {errors.username?.message}
          </p>
        )}

        <label htmlFor=''>Email</label>
        <input
          {...register('email', { required: 'please type in your email' })}
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='email'
          placeholder='example@mail.com'
        />
        {errors.email && (
          <p className='text-sm text-red-500 pt-2'>- {errors.email?.message}</p>
        )}

        <label htmlFor=''>Password</label>
        <input
          {...register('password', {
            required: 'Please type in your password',
          })}
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='password'
          placeholder='Password'
        />
        {errors.password && (
          <p className='text-sm text-red-500 pt-2'>
            - {errors.password?.message}
          </p>
        )}

        <label htmlFor=''>Confirm Password</label>
        <input
          {...register('matchPassword', {
            required: 'please re-type your password',
            validate: (value) =>
              value === passwordRef.current || 'Passwords do not match',
          })}
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='password'
          placeholder='Password'
        />
        {errors.matchPassword && (
          <p className='text-sm text-red-500 pt-2'>
            {errors.matchPassword?.message}
          </p>
        )}
        <div className='space-x-3 pt-2'>
          <Link
            href='/'
            className='py-1 px-5 border text-green-600 rounded-full w-fit active:bg-gray-200'
          >
            Home
          </Link>
          <input
            type='submit'
            className='py-1 px-5 bg-green-600 text-white rounded-full w-fit cursor-pointer focus:bg-green-700'
            value='Create Account'
          />
        </div>
      </form>
    </div>
  );
}
