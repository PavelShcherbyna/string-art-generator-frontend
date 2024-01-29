import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import userDataReducer from './userData/slice';
import audioDataReducer from './audioData/slice';
import infoPageDataReducer from './infoPageData/slice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userData: userDataReducer,
    audioData: audioDataReducer,
    infoPageData: infoPageDataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
