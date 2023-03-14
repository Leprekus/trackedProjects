import React, { ReactComponentElement, useEffect, useState } from 'react'
import playDesktop from '../../assets/play-desktop.png'
import playMobile from '../../assets/play-mobile.png'
import pauseDesktop from '../../assets/pause-desktop.png'
import pauseMobile from '../../assets/pause-mobile.png'
import Image from 'next/image'

function Button({ onClick, children }:any) {

  return (
    <button onClick={onClick} className='w-10 h-10 pl-1  bg-green-300'>
      { children }
      </button>
  )
}

function Controls({ spotify, isPlaying }:any) {
  const [toggle, setToggle] = useState(isPlaying)
  useEffect(() => {
    setToggle(isPlaying)
  }, [isPlaying])
  
  console.log(toggle)
  const handleToggle = () =>{
    if(toggle) {
      spotify.pause()
      .then(() => console.log('paused'))
      .catch((e:Error) => console.log(e))
    } else {
      spotify.play()
      .then(() => console.log('playing'))
      .catch((e:Error) => console.log(e))
    }
    setToggle(!toggle)
  }
  return (
    <div>{toggle ? 
      <Button onClick={handleToggle} device='mobile'>
        <Image 
        src={pauseMobile} 
        alt="media-controls" />
       </Button>
      :
        <Button onClick={handleToggle} display>
        <Image 
        src={playMobile} 
        alt="media-controls" />
       </Button>
    }
    </div>
  )
}

export default Controls