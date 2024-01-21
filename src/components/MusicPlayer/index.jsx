import React from 'react';
import { useLocation } from 'react-router-dom';
import MusicPlayerContainer from './MusicPlayerContainer';

export default function MusicPlayer() {
  const location = useLocation();
  const urlStr = location?.pathname || '';
  const allowedPage = urlStr.includes('/app');

  return <>{allowedPage && <MusicPlayerContainer />}</>;
}
