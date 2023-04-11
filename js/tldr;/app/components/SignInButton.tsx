'use client';
import React from 'react'

export default function SignInButton() {
  const handleSignIn = async () => {
    const res = await fetch('/api/auth/route', {method: 'GET'})

    console.log(res)
  }
  return (
    <button onClick={handleSignIn}>SignInButton</button>
  )
}
