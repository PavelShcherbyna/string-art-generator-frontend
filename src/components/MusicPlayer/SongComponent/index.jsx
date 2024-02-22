import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { SongWrapper } from './styles';
import MusicPlayBtn from './MusicPlayBtn';
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
    source.loop = true;
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
    } else if (!activeSongId) {
      // pause implementation
      pause();
      setIsPlaying(false);
    } else {
      // stop implementation
      pause();
      setIsPlaying(false);
    }
  }, [activeSongId, song]);

  function onBtnClick() {
    handlePlay(song.id);
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  return (
    <SongWrapper
      className={cn({
        playing: isPlaying
      })}
    >
      <div>
        <MusicPlayBtn isPlaying={isPlaying} onClickHandler={onBtnClick} />
        <p>{song.name}</p>
      </div>
    </SongWrapper>
  );
}
