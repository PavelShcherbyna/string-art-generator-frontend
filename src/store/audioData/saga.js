import { put, takeEvery } from 'redux-saga/effects';
import { getSongs, saveSongs, saveTTSAudioSrc, sendTextToAudio } from './slice';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import {
  GET_SONGS_LIST,
  POST_TEXT_TO_SPEECH
} from '../../constants/ApiEndpoints';
import { SERVER_URL } from '../../constants/ApiConstants';
import { getSessionStorageItem } from '../../helpers/sessionStorage';
import { access_token } from '../../constants';

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

function* textToAudioRequest({ payload }) {
  try {
    const { text, lang } = payload;
    const token = getSessionStorageItem(access_token);

    const res = yield axios.post(
      POST_TEXT_TO_SPEECH(),
      { text, lang },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const audioSrc = `data:audio/mp3;base64,${res.data.audioContent}`;

    yield put(saveTTSAudioSrc({ src: audioSrc }));
  } catch (error) {
    console.log('SAGA ERROR', error);

    let errorMsg = error?.response?.data?.message || 'Something went wrong!';

    yield toast.error(errorMsg);
  }
}

function* audioDataSaga() {
  yield takeEvery(getSongs, getSongsList);
  yield takeEvery(sendTextToAudio, textToAudioRequest);
}

export default audioDataSaga;
