import { put, takeEvery, takeLeading } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CODE_LOGIN, POST_DRAWINGS } from '../../constants/ApiEndpoints';
import { loginUser, postDrawings, saveDrawings, saveUserData } from './slice';
import {
  getSessionStorageItem,
  setSessionStorageItem
} from '../../helpers/sessionStorage';
import { access_token } from '../../constants';

function* codeLogin({ payload }) {
  try {
    const res = yield axios.post(CODE_LOGIN(), { password: payload.password });

    const {
      token,
      user: { drawings }
    } = res.data;

    if (token) {
      setSessionStorageItem(access_token, token);
    }

    yield put(saveUserData({ drawings, isLoggedIn: !!token }));
  } catch (error) {
    console.log('SAGA ERROR', error);

    yield put(saveUserData({ drawings: [], isLoggedIn: false }));

    const errorMsg = error?.response?.data?.message || 'Something went wrong!';
    yield toast.error(errorMsg);
  }
}

function* updateDrawings({ payload }) {
  try {
    const token = getSessionStorageItem(access_token);

    const res = yield axios.post(
      POST_DRAWINGS(),
      {
        drawings: payload.drawings
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const {
      user: { drawings }
    } = res.data;

    yield put(saveDrawings({ drawings }));
  } catch (error) {
    console.log('SAGA ERROR', error);

    let errorMsg = error?.response?.data?.message || 'Something went wrong!';
    errorMsg = errorMsg.includes('jwt')
      ? 'Your session has expired. Please login again'
      : errorMsg;

    yield toast.error(errorMsg);
  }
}

function* userDataSaga() {
  yield takeLeading(loginUser, codeLogin);
  yield takeEvery(postDrawings, updateDrawings);
}

export default userDataSaga;
