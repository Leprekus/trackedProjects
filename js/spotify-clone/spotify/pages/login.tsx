import React from 'react'
import { useSession, signIn, signOut, getProviders } from 'next-auth/react'
import { Provider } from '../typings'
interface Providers {
    providers: Provider[]
}
function login({ providers }: Providers) {
    const { data: session } = useSession()

    if(session) {
        return (
            <div>
                <button onClick={() => signOut()}>sign out</button>
            </div>
        )
    }

    return (
        <div>
            <img 
            className='w-12 h-12'
            src="https://links.papareact.com/9xl" alt=""  
            
            />
            
            {Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id, { callbackUrl: '/'})}>
                        login with {provider.name}
                    </button>
                </div>
            ))}

        </div>
    )
}

export default login

export async function getServerSideProps () {
    const providers = await getProviders()
    return {
        props: {
             providers 
        }
    }
}