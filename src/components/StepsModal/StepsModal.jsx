import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonWithBorder } from '../reusableStyles';
import IconPause from '../../assets/IconPause';
import IconPlay from '../../assets/IconPlay';
import { StepsModalContainer, StepText } from './styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 3 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

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
