import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import Bar from './PlaybackBar/Bar'

function Layout({ children }:any) {
  return (
    <main className='max-w-7-xl min-h-screen mx-auto'>
      <aside>
        <ul>
          <li>Home</li>
          <li>Search</li>
          <li>Your library</li>
        </ul>
      </aside>
      { ...children }
      <Bar/>
    </main>
  )
}

export default Layout