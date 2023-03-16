import { configureStore } from '@reduxjs/toolkit'
import playbackReducer from './slices/Playback/PlaybackSlice';

const reducer = {
    playback: playbackReducer
}
const store = configureStore({
    reducer,
})

export default store;