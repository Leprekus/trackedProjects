import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTrack, setDeviceID, setPaused, setPlaybackState, setPlayer } from '../store/slices/Playback/playbackSlice';
import spotifyWebApi from '../utils/SpotifyApi';

export default function useSpotify() {
  const { data: session } = useSession();

  //const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const dispatch = useDispatch()
  useEffect(() => {
    if (session) {
      if (session?.error === 'RefreshAccessTokenError') {
        signIn();
      }
      //SpotifySDK
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
  
      document.body.appendChild(script);
  
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "SoundScape",
          getOAuthToken: (cb) => {
            cb(session.accessToken);
          },
          volume: 0.5,
        });
  
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          dispatch(setDeviceID(device_id))
        });
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });
  
        player.addListener("player_state_changed", (state) => {
          if (!state) {
            return;
          }
  
          dispatch(setCurrentTrack(state.track_window.current_track));
          dispatch(setPaused());
  
          player.getCurrentState().then((state) => {
            if (!state) {
              setPlaybackState(false);
            } else {
              setPlaybackState(true);
            }
          });
        });
        player.connect();
        dispatch(setPlayer(player));

      };
      //SpotifySDK
    }
  }, [session]);
  return spotifyWebApi;
}
