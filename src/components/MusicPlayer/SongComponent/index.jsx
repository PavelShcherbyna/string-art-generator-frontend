import React, { useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { SongWrapper } from './styles';
import MusicPlayBtn from './MusicPlayBtn';
// import { formatTime } from '../../../helpers';
import { toast } from 'react-toastify';
import { AudioApiContext } from '../../../App';

export default function SongComponent({
  song,
  activeSongId,
  handlePlay,
  handleNext
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [sourceNode, setSourceNode] = useState(null);
  const audioContext = React.useContext(AudioApiContext);
  // const [duration, setDuration] = useState(0);
  // const audioRef = useRef();

  // const onLoadedMetadata = () => {
  //   const seconds = audioRef.current.duration;
  //   setDuration(seconds);
  // };

  const memoizedFetch = useMemo(() => {
    return fetch(song.src)
      .then((response) => response.arrayBuffer())
      .catch(() => toast.error('Error loading audio'));
  }, [song.src]);

  useEffect(() => {
    const loadAudio = async () => {
      const arrayBuffer = await memoizedFetch;
      const copiedArrayBuffer = arrayBuffer.slice(0);
      const buffer = await audioContext.decodeAudioData(copiedArrayBuffer);
      setAudioBuffer(buffer);
    };

    loadAudio().catch(() => toast.error('Error processing audio'));

    return () => {
      if (sourceNode) {
        sourceNode.stop();
      }
    };
  }, [audioContext, memoizedFetch, sourceNode]);

  const play = () => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
    setSourceNode(source);
    setIsPlaying(true);
  };

  const pause = () => {
    if (sourceNode) {
      sourceNode.stop();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!!activeSongId && activeSongId === song.id) {
      setIsPlaying(true);
      play();
      // audioRef.current.play().catch(() => toast.error('Error playing audio'));
    } else if (!activeSongId) {
      // audioRef.current.pause();
      pause();
      setIsPlaying(false);
    } else {
      // audioRef.current.pause();
      // audioRef.current.currentTime = 0;
      pause();
      setIsPlaying(false);
    }
    // }, [activeSongId, song, audioRef]);
  }, [activeSongId, song]);

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
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (isPlaying) {
      pause();
      // audioRef.current.pause();
    } else {
      play();
      // audioRef.current.play().catch(() => toast.error('Error playing audio'));
    }
  }

  return (
    <SongWrapper
      className={cn({
        playing: isPlaying
      })}
    >
      {/*<audio*/}
      {/*  src={song.src}*/}
      {/*  ref={audioRef}*/}
      {/*  // onLoadedMetadata={onLoadedMetadata}*/}
      {/*  onEnded={handleNext}*/}
      {/*  loop={true}*/}
      {/*/>*/}
      <div>
        <MusicPlayBtn isPlaying={isPlaying} onClickHandler={onBtnClick} />
        <p>{song.name}</p>
      </div>
      {/*<p className={'time'}>{formatTime(duration)}</p>*/}
    </SongWrapper>
  );
}
