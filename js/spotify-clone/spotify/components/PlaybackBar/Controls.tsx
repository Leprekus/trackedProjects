import React, { ReactComponentElement, useEffect, useState } from 'react'
import playMobile from '../../assets/play-mobile.png'
import pauseMobile from '../../assets/pause-mobile.png'
import Image from 'next/image'
import shuffleWhite from '../../assets/shuffle.png'
import shuffleGreen from '../../assets/shuffle-green.png'
import previous from '../../assets/previous.png'

function Button({ onClick, children, className }:any) {

  return (
    <button onClick={onClick} className={`w-5 h-5 ${className}`}>
      { children }
      </button>
  )
}

function Controls({ spotify, isPlaying, setIsPlaying }:any) {
  //const [toggle, setToggle] = useState(isPlaying ? true : false)
  const [shuffle, setShuffle] = useState(false)
  // useEffect(() => {
  //   if(isPlaying !== toggle) {
  //     setToggle(isPlaying)
  //   }
  // }, [isPlaying])
  // console.log(isPlaying)
  const handleToggle = () =>{
    if(isPlaying) {
      spotify.pause()
      .then(() => console.log('paused'))
      .catch((e:Error) => console.log(e))
    } else {
      spotify.play()
      .then(() => console.log('playing'))
      .catch((e:Error) => console.log(e))
    }
    setIsPlaying(!isPlaying)
  }
  const handleShuffle = () => {
    spotify.setShuffle(!shuffle)
    setShuffle(!shuffle)
  }
  return (
    <div className='text-white flex gap-x-2 mr-4'>
      <Button onClick={handleShuffle} className='sm:hidden md:block p-0.5'>
        <Image src={shuffle ? shuffleGreen : shuffleWhite} alt='shuffle'/>
      </Button>
      <Button onClick={() => spotify.skipToNext() } className='sm:hidden md:block p-1'>
        <Image src={previous} alt=''/>
      </Button>
      {isPlaying ? 
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
    <Button onClick={() => spotify.skipToPrevious()} className='sm:hidden md:block rotate-180 p-1'>
        <Image src={previous} alt=''/>
      </Button>
    </div>
  )
}

export default Controls