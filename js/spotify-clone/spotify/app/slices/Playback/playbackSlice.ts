import { createSlice } from '@reduxjs/toolkit'

interface PlaybackState {}
const initialState = {} as PlaybackState

const playbackSlice = createSlice({
    name: 'playback',
    initialState,
    reducers: {
        add: (state) => state
    },
    extraReducers(builder) {
        
    },
})
export const { add } = playbackSlice.actions
export default playbackSlice.reducer