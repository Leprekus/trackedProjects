import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
function login() {
    const { data: session } = useSession()
    if(session) {
        return (
            <div>
                <h1>Welcome Back {session.user?.name}!</h1>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
  return (
    <div>
        <button onClick={() => signIn()}>Login</button>
    </div>
  )
}

export default login