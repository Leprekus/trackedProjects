import Link from 'next/link'
import React from 'react'

export default function login() {
  return (
    <div>
    <form action="" className='flex flex-col w-full md:w-1/2 mx-auto space-y-2 mt-32'>
        <h1 className='text-2x'>Login</h1>
        <label htmlFor="">Username</label>
        <input className='shadow shadow-gray-300 rounded px-3 py-0.5' type="text" placeholder='Username'/>
        <label htmlFor="">Password</label>
        <input className='shadow shadow-gray-300 rounded px-3 py-0.5' type="text" placeholder='Username'/>
    <div className='space-x-3 pt-2'>
        <Link href='/' className='py-1 px-5 border text-green-600 rounded-full w-fit active:bg-gray-200'>Home</Link>
        <input type='submit' className='py-1 px-5 bg-green-600 text-white rounded-full w-fit' value='Sign in'/>
    </div>
    </form>
</div>
  )
}
