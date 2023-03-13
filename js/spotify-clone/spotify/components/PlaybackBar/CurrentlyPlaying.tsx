import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'

function CurrentlyPlaying() {
    const spotify = useSpotify()
    const [playbackState, setPlaybackState] = useState({})
    
    useEffect(() => {
        spotify.getMyCurrentPlaybackState()
        .then((data) => setPlaybackState(data.body))
        .catch(error => console.log({error}))

    
    }, [spotify])
    console.log(playbackState)
  return (
    <div>
        CurrentlyPlaying
        <p className='text-white'>{playbackState?.items?.name}</p>
    </div>
  )
}

export default CurrentlyPlaying