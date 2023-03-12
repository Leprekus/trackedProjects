import { getSession, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { Context } from 'vm'
import Playlist from '../components/Playlist/Playlist'
import useSpotify from '../hooks/useSpotify'
import spotifyWebApi from '../utils/SpotifyApi'

export async function getServerSideProps(context:Context) {
  const session = await getSession(context)
  return {
    props : {
      session
    }
  }
}
function home({ }) {
  
  return (
    <div className='max-w-7xl mx-auto' >
      section 1
      playlists made by user
      ---
      section2
      playlists made for user href='show all'
      top mixes  href='show all'
      recently played  href='show all'
    <button >user</button>
    <Playlist/>
    </div>
  )
}

export default home