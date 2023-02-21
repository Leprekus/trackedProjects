import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header>
        <div>
            <Link href='/'>
                <Image src='https://links.papareact.com/yvf' alt='logo' width={200} height={200}></Image>
            </Link>
        </div>
        <div>
            <Link href='/'>
            
            </Link>
        </div>
    </header>
  )
}

export default Header