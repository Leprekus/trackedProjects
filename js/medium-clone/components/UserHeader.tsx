import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUser, signOut } from '../utils/signToken';

interface Props {
  name: string;
}
function UserHeader({ name }: Props) {
  const router = useRouter()
  const handleSignOut = () => {
    setIsLoggedIn(false)
    return router.push('/')
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (name) {
      setIsLoggedIn(true);
    }
    if (!name) {
      handleSignOut()
    }
  }, [name]);

  return isLoggedIn ? (
    <header className='flex justify-between p-5 max-w-7xl mx-auto bg-white shadow'>
      <Link href='/' className='text-green-600 hover:underline text-lg'>
        Home
      </Link>
      <h2 className='text-2xl text-green-600'>{name}'s Dashboard</h2>
      <div className='flex items-center space-x-5 text-green-600'>
        {isLoggedIn ? (
          <button onClick={() => signOut(handleSignOut)}>Sign out</button>
        ) : (
          <>
            <Link href='/login' className='cursor-pointer'>
              Sign In
            </Link>
            <Link
              href='/register'
              className='cursor-pointer  border px-4 py-1 rounded-full'
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  ) : (
    <button>Sign in</button>
  );
}

export default UserHeader;
