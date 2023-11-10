import { all, fork } from 'redux-saga/effects';
import userDataSaga from './userData/saga';

export default function* rootSaga() {
  yield all([fork(userDataSaga)]);
}
