import store, { AppState } from '../../store';

export const selectCurrentTrack = (state: AppState) => state.playback.currentTrack;

export const selectDeviceID = (state: AppState) => state.playback.deviceID;
