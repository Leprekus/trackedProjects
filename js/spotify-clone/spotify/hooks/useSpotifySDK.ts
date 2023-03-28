import { useEffect, useState } from 'react'

interface Props {
    token: string
}
export default function useSpotifySDK ({ token }:Props) {
    const [player, setPlayer] = useState<Spotify.Player | null>(null)
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
              name: "Web Playback SDK",
              getOAuthToken: (cb) => {
                cb(token);
              },
              volume: 0.5,
            });

            setPlayer(player)

    }, [token])
}