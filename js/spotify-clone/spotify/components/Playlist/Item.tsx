import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentTrack } from '../../store/slices/Playback/playbackSelector';
import { Tracks } from '../../types/typings';

interface Props {
  data: Tracks;
}
function Item({ data }: Props) {
  const currentTrack = useSelector(selectCurrentTrack)
  return (
    <div className='w-52 h-80 rounded-xl overflow-hidden'
    style={{ backgroundImage: `url(${data.album.images[0].url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}
    >
      {/* <img 
      className='h-full w-full object-cover transition-all 
      hover:scale-105 hover:ease-in hover:duration-75
      z-0' 
      src={data.album.images[0].url} 
      alt='playlist-cover' /> */}
      <div className='h-80 w-52 pl-4 py-3 flex items-end cursor-pointer' 
      style={{ backgroundColor: 'rgba(0,0,0,0.2)'}}
      onClick={() => console.log({ currentTrack })}
      >
        <div className='w-5/6 max-h-36 overflow-hidden'>
          <p className='text-md text-white z-10 relative font-semibold'>{ data.name }</p>
          {data.name !== data.album.name && <p className='text-xs text-white z-10 relative font-semibold'>{ data.album.name }</p>}
        </div>
      </div>
    </div>
  );
}

export default Item;
