import { createSlice } from '@reduxjs/toolkit';

export const audioDataSlice = createSlice({
  name: 'audioData',
  initialState: {
    showMusicPlayer: false,
    songs: [],
    songsLoading: false,
    audioFromTextSrc: ''
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
    },
    sendTextToAudio: (state, action) => {
      return { ...state, audioFromTextSrc: '' };
    },
    saveTTSAudioSrc: (state, action) => {
      const { src } = action.payload;
      return { ...state, audioFromTextSrc: src };
    },
    clearTTSAudioSrc: (state, action) => {
      return { ...state, audioFromTextSrc: '' };
    }
  }
});

export const {
  openMusicPlayer,
  getSongs,
  saveSongs,
  clearSongs,
  sendTextToAudio,
  saveTTSAudioSrc,
  clearTTSAudioSrc
} = audioDataSlice.actions;

export default audioDataSlice.reducer;
