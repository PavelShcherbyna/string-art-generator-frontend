import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    loginLoading: false,
    isLoggedIn: false,
    drawings: [],
    justGenDrawId: '',
    inPlayerDrawId: ''
  },
  reducers: {
    loginUser: (state, action) => {
      return { ...state, loginLoading: true };
    },
    saveUserData: (state, action) => {
      const { drawings = [], isLoggedIn = false } = action.payload;

      return { ...state, drawings, isLoggedIn, loginLoading: false };
    },
    postDrawings: (state, action) => {
      const { drawings = [] } = action.payload;
      const justGenDrawId = drawings[0]?.f_id;

      return { ...state, justGenDrawId };
    },
    saveDrawings: (state, action) => {
      const { drawings = [] } = action.payload;

      return { ...state, drawings };
    }
  }
});

export const { loginUser, saveUserData, postDrawings, saveDrawings } =
  userDataSlice.actions;

export default userDataSlice.reducer;
