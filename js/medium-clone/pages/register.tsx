import Link from 'next/link';
import React from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';

interface UserForm {
  name: string, 
  username: string, 
  email: string,
  password: string
}
export default function register() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm<UserForm>()

  const createUser: SubmitHandler<UserForm> = async (data) => {
    console.log('data: ', data);
    // await fetch('/api/createComment', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error('Bad Response', {
    //         cause: { res },
    //       });
    //     }
    //     setSubmitted(true);
    //   })
    //   .catch((e) => {
    //     setSubmitted(false);
    //     switch (e.cause.res?.status) {
    //       case 400:
    //         console.log('Bad request');
    //         break;
    //       case 401:
    //         console.log('Aunauthorized response');
    //         break;
    //       case 404:
    //         console.log('Not found');
    //         break;
    //       case 500:
    //         console.log('Internal server error');
    //         break;
    //     }
    //   });
  }
  return (
    <div>
      <form
      onSubmit={handleSubmit(createUser)}
        action=''
        className='flex flex-col max-w-sm md:w-1/2 mx-auto space-y-2 mt-32 p-10'
      >

        <h1 className='text-2xl'>Register</h1>
        <label htmlFor=''>Name</label>
        <input
          {...register('name', { required: true })}
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='text'
          placeholder='Johnny Appleseed'
        />
        <label htmlFor=''>Username</label>
        <input
          {...register('username', { required: true })}
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='text'
          placeholder='Appleseed'
        />                
        <label htmlFor=''>Email</label>
        <input
          {...register('email', { required: true })}
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='email'
          placeholder='example@mail.com'
        />
        <label htmlFor=''>Password</label>
        <input
          {...register('password', { required: true })}
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='password'
          placeholder='Password'
        />
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
