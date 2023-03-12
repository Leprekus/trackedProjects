import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

function Layout({ children }:any) {
  return (
    <main className='max-w-7-xl mx-auto'>
      <aside>
        <ul>
          <li>Home</li>
          <li>Search</li>
          <li>Your library</li>
        </ul>
      </aside>
      { ...children }
    </main>
  )
}

export default Layout