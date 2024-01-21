import { createSlice } from '@reduxjs/toolkit';

export const infoPageSlice = createSlice({
  name: 'infoPageData',
  initialState: {
    photoLists: {
      lvl1: [],
      lvl2: [],
      lvl3: []
    }
  },
  reducers: {
    getPhotoList: (state, action) => {
      return { ...state };
    },
    savePhotoList: (state, action) => {
      const { photoCollection } = action.payload;
      return { ...state, photoLists: photoCollection };
    }
  }
});

export const { getPhotoList, savePhotoList } = infoPageSlice.actions;

export default infoPageSlice.reducer;
