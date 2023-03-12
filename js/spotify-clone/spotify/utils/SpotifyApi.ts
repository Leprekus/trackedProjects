import SpotifyWebApi from 'spotify-web-api-node';

const spotifyWebApi = new SpotifyWebApi({
    clientId: process.env.NEXT_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.NEXT_SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.NEXT_SECRET,
})
export default spotifyWebApi