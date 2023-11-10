import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {},
  reducers: {
    saveUserData: (state, action) => {
      return { ...state };
    }
  }
});

export const { saveUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
