import store, { AppState } from '../../store';

export const selectCurrentTrack = (state: AppState) => state.playback.currentTrack;
