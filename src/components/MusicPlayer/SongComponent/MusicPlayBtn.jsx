import React from 'react';
import pauseSVG from '../../../assets/player-controls/pause_button.svg';
import playSVG from '../../../assets/icon_play_music.svg';
import { PlayMusicBtn } from './styles';

export default function MusicPlayBtn({ isPlaying, onClickHandler }) {
  return (
    <PlayMusicBtn onClick={onClickHandler}>
      {isPlaying ? (
        <img src={pauseSVG} alt="Pause button" draggable={false} />
      ) : (
        <img src={playSVG} alt="Play button" draggable={false} />
      )}
    </PlayMusicBtn>
  );
}
