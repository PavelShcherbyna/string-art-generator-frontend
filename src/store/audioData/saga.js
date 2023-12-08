import { put, takeEvery } from 'redux-saga/effects';
import { getSongs, saveSongs } from './slice';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { GET_SONGS_LIST } from '../../constants/ApiEndpoints';
import { SERVER_URL } from '../../constants/ApiConstants';

function* getSongsList() {
  try {
    const res = yield axios.get(GET_SONGS_LIST());

    const { songsList } = res.data;

    const preparedList = songsList.map((song) => {
      return {
        id: nanoid(),
        name: song.name || 'No name',
        src: `${SERVER_URL}/song/${song.fileName}`
      };
    });

    yield put(saveSongs({ songs: preparedList }));
  } catch (error) {
    console.log('SAGA ERROR', error);

    let errorMsg = error?.response?.data?.message || 'Something went wrong!';

    yield toast.error(errorMsg);
  }
}

function* audioDataSaga() {
  yield takeEvery(getSongs, getSongsList);
}

export default audioDataSaga;
