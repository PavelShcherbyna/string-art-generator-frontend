import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongs, clearSongs } from '../../../store/audioData/slice';
import { MusicPlayerWrapper } from './styles';
import SongComponent from '../SongComponent';
import { Progress } from '../../Progress/Progress';

export default function MusicPlayerContainer() {
  const { songs, songsLoading } = useSelector((state) => state.audioData);
  const [activeSongId, setActiveSongId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongs());
    return function () {
      dispatch(clearSongs());
    };
  }, [dispatch]);

  function handlePlay(id) {
    if (activeSongId !== id) {
      setActiveSongId(id);
    } else {
      setActiveSongId('');
    }
  }

  function handleNext() {
    if (activeSongId) {
      const songIndex = songs.findIndex((song) => song.id === activeSongId);

      let nextSongId;

      if (songIndex < 0 || songIndex >= songs.length - 1) {
        nextSongId = songs[0]?.id;
      } else {
        nextSongId = songs[songIndex + 1]?.id;
      }

      // If there is only one song - it will be playing in cycle
      if (activeSongId === nextSongId) {
        setActiveSongId('');

        setTimeout(() => {
          setActiveSongId(nextSongId);
        }, 0);
      } else {
        setActiveSongId(nextSongId);
      }
    }
  }

  return (
    <>
      <MusicPlayerWrapper>
        {songsLoading ? (
          <Progress />
        ) : (
          <>
            {songs.map((song) => {
              return (
                <SongComponent
                  key={song.id}
                  song={song}
                  activeSongId={activeSongId}
                  handlePlay={handlePlay}
                  handleNext={handleNext}
                />
              );
            })}
          </>
        )}
      </MusicPlayerWrapper>
    </>
  );
}
