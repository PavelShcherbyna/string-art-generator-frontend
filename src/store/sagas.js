import { all, fork } from 'redux-saga/effects';
import userDataSaga from './userData/saga';
import audioDataSaga from './audioData/saga';
import infoPageSaga from './infoPageData/saga';

export default function* rootSaga() {
  yield all([fork(userDataSaga), fork(audioDataSaga), fork(infoPageSaga)]);
}
