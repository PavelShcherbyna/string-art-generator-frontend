import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    drawnings: [],
    isLoggedIn: false,
    loginLoading: false
  },
  reducers: {
    loginUser: (state, action) => {
      return { ...state, loginLoading: true };
    },
    saveUserData: (state, action) => {
      const { drawnings = [], isLoggedIn = false } = action.payload;
      return { ...state, drawnings, isLoggedIn, loginLoading: false };
    }
  }
});

export const { loginUser, saveUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
