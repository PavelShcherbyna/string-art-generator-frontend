import { all, fork } from 'redux-saga/effects';
import userDataSaga from './userData/saga';
import audioDataSaga from './audioData/saga';

export default function* rootSaga() {
  yield all([fork(userDataSaga), fork(audioDataSaga)]);
}
