import { put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CODE_LOGIN } from '../../constants/ApiEndpoints';
import { loginUser, saveUserData } from './slice';
import { setSessionStorageItem } from '../../helpers/sessionStorage';
import { access_token } from '../../constants';

function* codeLogin({ payload }) {
  try {
    const res = yield axios.post(CODE_LOGIN(), { password: payload.password });

    const {
      token,
      data: {
        user: { drawnings }
      }
    } = res.data;

    if (token) {
      setSessionStorageItem(access_token, token);
    }

    yield put(saveUserData({ drawnings, isLoggedIn: !!token }));
  } catch (error) {
    console.log('SAGA ERROR', error);

    yield put(saveUserData({ drawnings: [], isLoggedIn: false }));

    const errorMsg = error?.response?.data?.message || 'Something went wrong!';
    yield toast.error(errorMsg);
  }
}

function* userDataSaga() {
  yield takeEvery(loginUser, codeLogin);
}

export default userDataSaga;
