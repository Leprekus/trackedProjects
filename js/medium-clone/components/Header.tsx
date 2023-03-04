import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getUser, signOut } from '../utils/signToken';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const profile = getUser()
  useEffect(() => {
    if(profile) {
      setIsLoggedIn(true)
    }
    if(!profile) {
      setIsLoggedIn(false)
    }
  }, [profile])
  
  return (
    <header className='flex justify-between p-5 max-w-7xl mx-auto' >
      <div className='flex items-center sapce-x-5'>
        <Link href='/'>
          <Image
            src='https://links.papareact.com/yvf'
            alt='logo'
            className='w-44 object-contain cursor-pointer'
            width={200}
            height={200}
          />
        </Link>
        <div
          className='hidden md:inline-flex
        items-center space-x-5'
        >
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className='text-white bg-green-600 
          px-4 py-1 rounded-full cursor-pointer'>Follow</h3>
        </div>
      </div>

      <div className='flex items-center space-x-5 text-green-600'>
      {
        isLoggedIn ? 
        <>
        <Link href={`/dashboard/${profile}`} className='text-white bg-green-600 
          px-4 py-2 rounded-full cursor-pointer'>{profile?.user?.name}'s Dashboard</Link>
        <button onClick={() =>signOut(setIsLoggedIn)}>Sign out</button>
        </>
        :
        <>
        <Link href='/login' className='cursor-pointer'>Sign In</Link>
        <Link href='/register' className='cursor-pointer  border px-4 py-1 rounded-full'>Get Started</Link>
        </>
        }      
      </div>
    </header>
  );
}

export default Header;
