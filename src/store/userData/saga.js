import { put, takeEvery, select } from 'redux-saga/effects';
import { sagaActions } from '../sagaActions';

function* login() {
  try {
  } catch (error) {
    console.log('SAGA ERROR', error);
  }
}

function* userDataSaga() {
  yield takeEvery(sagaActions.TEST_ACTION, login);
}

export default userDataSaga;
