import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ButtonWithBorder } from '../reusableStyles';
import IconPause from '../../assets/IconPause';
import IconPlay from '../../assets/IconPlay';
import { StepsModalContainer, StepText } from './styles';
import BootstrapDialog from './CommonComponents/BootstrapDialog';
import BootstrapDialogTitle from './CommonComponents/BootstrapDialogTitle';

export default function StepsModal({
  open,
  handleClose,
  isPlaying,
  onPlayClick,
  onStopClick,
  currentStepText
}) {
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <StepsModalContainer>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          />
          <DialogContent>
            <StepText>{currentStepText}</StepText>
          </DialogContent>
          <DialogActions>
            {isPlaying ? (
              <ButtonWithBorder onClick={onStopClick}>
                <IconPause />
                <span>Пауза</span>
              </ButtonWithBorder>
            ) : (
              <ButtonWithBorder onClick={onPlayClick}>
                <IconPlay />
                <span>Играть</span>
              </ButtonWithBorder>
            )}
          </DialogActions>
        </StepsModalContainer>
      </BootstrapDialog>
    </div>
  );
}
