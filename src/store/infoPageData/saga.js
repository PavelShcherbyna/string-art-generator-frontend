import { put, takeEvery } from 'redux-saga/effects';
import { getPhotoList, savePhotoList } from './slice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_INFO_PAGE_PHOTOS } from '../../constants/ApiEndpoints';

function* getInfoPagePhotos() {
  try {
    const res = yield axios.get(GET_INFO_PAGE_PHOTOS());

    const { photos } = res.data;

    const photoCollection = {};

    for (const prop in photos) {
      photoCollection[prop] = photos[prop].map(
        (filePath) => `${process.env.REACT_APP_API_URL}/${filePath}`
      );
    }

    yield put(savePhotoList({ photoCollection }));
  } catch (error) {
    console.log('SAGA ERROR', error);

    let errorMsg = error?.response?.data?.message || 'Something went wrong!';

    yield toast.error(errorMsg);
  }
}

function* infoPageSaga() {
  yield takeEvery(getPhotoList, getInfoPagePhotos);
}

export default infoPageSaga;
