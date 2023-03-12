import React from 'react';
import { Tracks } from '../../types/typings';

interface Props {
  data: Tracks;
}
function Item({ data }: Props) {
  console.log(data);
  return (
    <div className='bg-slate-600 w-52 h-80 rounded-xl 
    overflow-hidden transition-all
    hover:shadow-lg hover:shadow-slate-500 hover:ease-in'>
      {/* {data.album.images.map((image) => (
        <img src={image.url} alt='playlist-cover' />
      ))} */}
      <img 
      className='h-full w-ful object-cover transition-all 
      hover:scale-105 hover:ease-in hover:duration-75' 
      src={data.album.images[0].url} 
      alt='playlist-cover' />
    </div>
  );
}

export default Item;
