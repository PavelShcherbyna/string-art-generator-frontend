import { createSlice } from '@reduxjs/toolkit';

export const audioDataSlice = createSlice({
  name: 'audioData',
  initialState: {
    showMusicPlayer: false,
    songs: [],
    songsLoading: false
  },
  reducers: {
    openMusicPlayer: (state, action) => {
      return { ...state, showMusicPlayer: !state.showMusicPlayer };
    },
    getSongs: (state, action) => {
      return { ...state, songsLoading: true };
    },
    saveSongs: (state, action) => {
      const { songs } = action.payload;
      return { ...state, songs, songsLoading: false };
    },
    clearSongs: (state, action) => {
      return { ...state, songs: [] };
    }
  }
});

export const { openMusicPlayer, getSongs, saveSongs, clearSongs } =
  audioDataSlice.actions;

export default audioDataSlice.reducer;
