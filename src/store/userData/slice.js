import { createSlice } from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    loginLoading: false,
    isLoggedIn: false,
    drawings: [],
    justGenDrawId: ''
  },
  reducers: {
    loginUser: (state, action) => {
      return { ...state, loginLoading: true };
    },
    saveUserData: (state, action) => {
      const { drawings = [], isLoggedIn = false } = action.payload;

      return {
        ...state,
        drawings,
        isLoggedIn,
        loginLoading: false,
        justGenDrawId: ''
      };
    },
    postDrawings: (state, action) => {
      const { drawings = [] } = action.payload;
      const justGenDrawId = drawings[0]?.f_id;

      return { ...state, justGenDrawId };
    },
    saveDrawings: (state, action) => {
      const { drawings = [] } = action.payload;

      return { ...state, drawings };
    },
    changeDrawingStep: (state, action) => {
      const drawing = action.payload;

      const filteredDrawings = state.drawings.filter(
        (obj) => obj.f_id !== drawing.f_id
      );

      return { ...state, drawings: [...filteredDrawings, drawing] };
    },
    setActiveDrawing: (state, action) => {
      const { f_id } = action.payload;

      return { ...state, justGenDrawId: f_id };
    }
  }
});

export const {
  loginUser,
  saveUserData,
  postDrawings,
  saveDrawings,
  changeDrawingStep,
  setActiveDrawing
} = userDataSlice.actions;

export default userDataSlice.reducer;
