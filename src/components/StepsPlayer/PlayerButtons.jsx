import React from 'react';
// Icons
import doubleBackSVG from '../../assets/player-controls/double_back_rewind.svg';
import backRewindSVG from '../../assets/player-controls/back_rewind.svg';
import doubleForwardSVG from '../../assets/player-controls/double_forward_rewind.svg';
import forwardRewindSVG from '../../assets/player-controls/forward_rewind.svg';
import playSVG from '../../assets/player-controls/play_button.svg';
import pauseSVG from '../../assets/player-controls/pause_button.svg';
import { useIntl } from 'react-intl';

export const PlayerButton = ({
  onButtonClick,
  imgSrc,
  text = null,
  specialCN = ''
}) => {
  return (
    <div className={`rewind-btn-wrap ${specialCN}`}>
      <button onClick={onButtonClick}>
        <img src={imgSrc} alt="Rewind arrow" draggable={false} />
      </button>
      <span>{text}</span>
    </div>
  );
};

export const DblBackRewindBtn = ({ onButtonClick }) => {
  const intl = useIntl();
  return (
    <PlayerButton
      imgSrc={doubleBackSVG}
      text={intl.formatMessage(
        {
          id: 'steps.player.btn.step',
          defaultMessage: '{num}s.'
        },
        { num: 10 }
      )}
      onButtonClick={onButtonClick}
    />
  );
};

export const BackRewindBtn = ({ onButtonClick }) => {
  const intl = useIntl();
  return (
    <PlayerButton
      imgSrc={backRewindSVG}
      text={intl.formatMessage(
        {
          id: 'steps.player.btn.step',
          defaultMessage: '{num}s.'
        },
        { num: 1 }
      )}
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
  const intl = useIntl();
  return (
    <PlayerButton
      imgSrc={doubleForwardSVG}
      text={intl.formatMessage(
        {
          id: 'steps.player.btn.step',
          defaultMessage: '{num}s.'
        },
        { num: 10 }
      )}
      onButtonClick={onButtonClick}
    />
  );
};

export const ForwardRewindBtn = ({ onButtonClick }) => {
  const intl = useIntl();
  return (
    <PlayerButton
      imgSrc={forwardRewindSVG}
      text={intl.formatMessage(
        {
          id: 'steps.player.btn.step',
          defaultMessage: '{num}s.'
        },
        { num: 1 }
      )}
      onButtonClick={onButtonClick}
    />
  );
};
