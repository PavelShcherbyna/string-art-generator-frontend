import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { SongWrapper } from './styles';
import MusicPlayBtn from './MusicPlayBtn';
// import { formatTime } from '../../../helpers';
import { toast } from 'react-toastify';

export default function SongComponent({
  song,
  activeSongId,
  handlePlay,
  handleNext
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  // const onLoadedMetadata = () => {
  //   const seconds = audioRef.current.duration;
  //   setDuration(seconds);
  // };

  useEffect(() => {
    if (!!activeSongId && activeSongId === song.id) {
      setIsPlaying(true);
      audioRef.current.play().catch(() => toast.error('Error playing audio'));
    } else if (!activeSongId) {
      audioRef.current.pause();

      setIsPlaying(false);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      setIsPlaying(false);
    }
  }, [activeSongId, song, audioRef]);

  // useEffect(() => {
  //   if (isPlaying) {
  //     audioRef.current.error
  //       ? toast.error('Error loading audio')
  //       : audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }, [isPlaying]);
  //
  // function onBtnClick() {
  //   handlePlay(song.id);
  // }

  function onBtnClick() {
    handlePlay(song.id);

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => toast.error('Error playing audio'));
    }
  }

  return (
    <SongWrapper
      className={cn({
        playing: isPlaying
      })}
    >
      <audio
        src={song.src}
        ref={audioRef}
        // onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
        loop={true}
      />
      <div>
        <MusicPlayBtn isPlaying={isPlaying} onClickHandler={onBtnClick} />
        <p>{song.name}</p>
      </div>
      {/*<p className={'time'}>{formatTime(duration)}</p>*/}
    </SongWrapper>
  );
}
