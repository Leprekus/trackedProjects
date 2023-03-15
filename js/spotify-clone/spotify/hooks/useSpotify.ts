import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import spotifyWebApi from '../utils/SpotifyApi';

export default function useSpotify() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      if (session?.error === 'RefreshAccessTokenError') {
        signIn();
      }
      spotifyWebApi.setAccessToken(session!.accessToken)
    }
  }, [session]);
  return spotifyWebApi;
}
