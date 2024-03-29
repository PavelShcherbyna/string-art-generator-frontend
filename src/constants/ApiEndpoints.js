import { SERVER_URL } from './ApiConstants';

export const CODE_LOGIN = () => `${SERVER_URL}/code-login`;

export const POST_DRAWINGS = () => `${SERVER_URL}/save-drawings`;

export const GET_SONGS_LIST = () => `${SERVER_URL}/songs-list`;

export const GET_INFO_PAGE_PHOTOS = () => `${SERVER_URL}/info-page-photo-list`;

export const POST_TEXT_TO_SPEECH = () => `${SERVER_URL}/text-to-speech`;
