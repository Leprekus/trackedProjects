import Link from 'next/link';
import React from 'react';

export default function register() {
  return (
    <div>
      <form
        action=''
        className='flex flex-col w-full md:w-1/2 mx-auto space-y-2 mt-32'
      >
        <h1 className='text-2xl'>Register</h1>
        <label htmlFor=''>Name</label>
        <input
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='text'
          placeholder='Johnny Appleseed'
        />
        <label htmlFor=''>Username</label>
        <input
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='text'
          placeholder='Appleseed'
        />                
        <label htmlFor=''>Email</label>
        <input
          className='shadow shadow-gray-300 rounded px-3 py-0.5'
          type='email'
          placeholder='example@mail.com'
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
