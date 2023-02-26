import { getSession, useSession } from 'next-auth/react'
import React from 'react'

export default function Layout({ children }:any) {
    const { data: session } = useSession({ required: true })
  return (
    <div>{...children}</div>
  )
}
