import React from 'react';
// Icons
import doubleBackSVG from '../../assets/player-controls/double_back_rewind.svg';
import backRewindSVG from '../../assets/player-controls/back_rewind.svg';
import doubleForwardSVG from '../../assets/player-controls/double_forward_rewind.svg';
import forwardRewindSVG from '../../assets/player-controls/forward_rewind.svg';
import playSVG from '../../assets/player-controls/play_button.svg';
import pauseSVG from '../../assets/player-controls/pause_button.svg';

export const PlayerButton = ({
  onButtonClick,
  imgSrc,
  text = null,
  specialCN = ''
}) => {
  return (
    <div className={`rewind-btn-wrap ${specialCN}`}>
      <button onClick={onButtonClick}>
        <img src={imgSrc} alt="Rewind arrow" />
      </button>
      <span>{text}</span>
    </div>
  );
};

export const DblBackRewindBtn = ({ onButtonClick }) => {
  return (
    <PlayerButton
      imgSrc={doubleBackSVG}
      text={'10ш.'}
      onButtonClick={onButtonClick}
    />
  );
};

export const BackRewindBtn = ({ onButtonClick }) => {
  return (
    <PlayerButton
      imgSrc={backRewindSVG}
      text={'1ш.'}
      onButtonClick={onButtonClick}
    />
  );
};

export const PlayOrPauseBtn = ({ onButtonClick, isPlaying }) => {
  return (
    <PlayerButton
      onButtonClick={onButtonClick}
      imgSrc={isPlaying ? pauseSVG : playSVG}
      specialCN={'play-btn'}
    />
  );
};

export const DblForwardRewindBtn = ({ onButtonClick }) => {
  return (
    <PlayerButton
      imgSrc={doubleForwardSVG}
      text={'10ш.'}
      onButtonClick={onButtonClick}
    />
  );
};

export const ForwardRewindBtn = ({ onButtonClick }) => {
  return (
    <PlayerButton
      imgSrc={forwardRewindSVG}
      text={'1ш.'}
      onButtonClick={onButtonClick}
    />
  );
};
