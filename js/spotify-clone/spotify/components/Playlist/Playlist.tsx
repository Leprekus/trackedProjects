import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import ListOfUsersPlaylistsResponse from 'spotify-web-api-node'
import Item from './Item'
import { Tracks } from '../../types/typings'

interface Playlist {
    body?: {
        items?: Tracks[]
    }

}
function Playlist() {
    const spotify = useSpotify()
    const [playlists, setPlayists] = useState<Playlist>({})
    
    useEffect(() => {
        spotify.getMyTopTracks()
        .then((data) => setPlayists(data))
        .catch(error => console.log({error}))

    
    }, [spotify])

    console.log(playlists.body?.items)
  return (
    <div className='w-full h-fit overflow-x-scroll'>
        <div
        className='w-fit h-80 gap-x-1 flex'>
            {playlists?.body?.items ? playlists.body.items.map(data =>(
            <Item key={data.id} data={data}/>
        )): []}
        </div>
    </div>
  )
}

export default Playlist