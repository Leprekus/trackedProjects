import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from "next-redux-wrapper";
import { playbackSlice } from './slices/Playback/playbackSlice';


const reducer = {
    [playbackSlice.name]: playbackSlice.reducer
}
const store = () => configureStore({
    reducer,
    devTools: true
})

export default store;

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store);