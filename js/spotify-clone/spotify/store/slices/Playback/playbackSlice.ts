import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface PlaybackState {
  currentTrack: string | null;
}

// Initial state
const initialState: PlaybackState = {
  currentTrack: null,
};

// Actual Slice
export const playbackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    // Action to set the authentication status
    selectTrack(state, action) {
      state.currentTrack = action.payload;
    },
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

export const { selectTrack } = playbackSlice.actions;