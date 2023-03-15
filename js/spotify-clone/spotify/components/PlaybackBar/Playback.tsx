import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { Artists, Image } from '../../types/typings';
import Playlist from '../Playlist/Playlist';
import Slider from '../Slider';
import Controls from './Controls';

type Playback = {
  progress_ms?: number;
  is_playing: boolean;
  item?: {
    duration_ms: number;
    album: {
      images: Image[];
      artists: Artists[];
    };
    name: string;
  };
  device: {
    volume_percent: number;
    name: string;
  };
};
type Response = {
  body: Playback;
};

function CurrentlyPlaying() {
  const spotify = useSpotify();
  const [playbackState, setPlaybackState] = useState<Playback>({});
  const [volume, setVolume] = useState<string>('0');
  const [progress, setProgress] = useState<string>('0');
  const [isPlaying, setIsPlaying] = useState(false)
  //fetches data
  useEffect(() => {
    spotify
      .getMyCurrentPlaybackState()
      .then((data: Response) => {
        const progress =
          (playbackState?.progress_ms! * 100) /
          playbackState?.item?.duration_ms!;
        setPlaybackState(data?.body);
        setVolume(data?.body?.device?.volume_percent?.toString()!);
        setProgress(progress.toString());
      })
      .catch((error) => console.log({ error }));
  }, [spotify]);
  //listens if device is playing
  useEffect(() => {
    let interval: any = null;
    if (playbackState?.is_playing) {
      interval = setInterval(() => {
        spotify.getMyCurrentPlaybackState().then((res: Response) => {
          const progress = Math.floor(
            (res?.body?.progress_ms! * 100) / res?.body?.item?.duration_ms!
          );
          //updates song cover as well
          // if (progress > 85 || progress < 5) {
          //   setPlaybackState(res?.body);
          // }
          setPlaybackState(res?.body);
          setIsPlaying(res?.body?.is_playing)
          setProgress(progress.toString());
        });
      }, 2000);
    }
    if (!playbackState?.is_playing) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playbackState?.is_playing]);

  return (
    <div>
      <div className='w-full flex items-center justify-between'>
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
        <Controls spotify={spotify} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
      </div>
      <Slider className='hidden md:block' onChange={setVolume} value={volume} />
      Timestamp
      <div className='w-full h-1 bg-gray-800'>
        <div className='bg-green-400 h-1' style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default CurrentlyPlaying;
