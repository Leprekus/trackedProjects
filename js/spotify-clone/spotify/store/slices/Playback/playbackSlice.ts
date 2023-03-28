import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface PlaybackState {
  currentTrack: string | null;
  deviceID: string | null;
  player: Spotify.Player | null;
  paused: boolean;
  playbackState: boolean;
}

// Initial state
const initialState: PlaybackState = {
  currentTrack: null,
  deviceID: null,
  player: null,
  paused: true,
  playbackState: false
};

// Actual Slice
export const playbackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    // Action to set the authentication status
    setCurrentTrack(state, action) {
      state.currentTrack = action.payload;
    },
    setDeviceID(state, action) {
      state.deviceID = action.payload;
    },

    setPlayer(state, action) {
      state.player = action.payload;
    },
    setPaused(state) {
      state.paused = true
    },
    setPlaybackState(state, action) {
      state.playbackState = action.payload
    }
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.playback,
      };
    },
  },
});

export const { setCurrentTrack, setDeviceID, setPlayer, setPaused, setPlaybackState } = playbackSlice.actions;