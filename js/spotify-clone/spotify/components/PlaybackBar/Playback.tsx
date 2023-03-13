import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { Artists } from '../../types/typings';
import Playlist from '../Playlist/Playlist';
import Slider from '../Slider';

function CurrentlyPlaying() {
  const spotify = useSpotify();
  const [playbackState, setPlaybackState] = useState({});
  const [volume, setVolume] = useState<string>('0');
  const [progress, setProgress] = useState<string>('0');
  useEffect(() => {
    spotify
      .getMyCurrentPlaybackState()
      .then((data) => {
        setPlaybackState(data?.body);
        setVolume(data?.body?.device?.volume_percent?.toString()!);
        setProgress(
          (playbackState?.progress_ms * 100) / playbackState?.item?.duration_ms
        );
      })
      .catch((error) => console.log({ error }));
  }, [spotify]);
  console.log(progress);
  return (
    <div>
      <div
        className='flex gap-x-4 flex-row md:w-1/4
      p-4 items-center
      text-white text-sm'
      >
        <img src={playbackState?.item?.album?.images[2]?.url} alt='' />
        <div>
          <p>
            {playbackState?.item?.name} {'• '}
            <span className='gap-x-1 text-gray-400'>
              {playbackState?.item?.album?.artists.map(
                (artist: Artists, i: number) => (
                  <Link key={i} href={artist?.href}>
                    {artist?.name}
                  </Link>
                )
              )}
            </span>
          </p>
          <p className='font-semibold text-green-400'>
            {playbackState?.device?.name.toUpperCase()}
          </p>
        </div>
      </div>
      <label
        htmlFor='default-range'
        className=' block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        Volume
      </label>
      <Slider className='hidden md:block' onChange={setVolume} value={volume} />
      Timestamp
      <div className='w-full h-1 bg-gray-800'>
        <div
          className='bg-green-400 h-1'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default CurrentlyPlaying;
