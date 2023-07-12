import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ButtonWithBorder } from '../reusableStyles';
import { PickStepText, StepsModalContainer, PickStepInputWrap } from './styles';
import { useState } from 'react';
import { TextField } from '@mui/material';
import BootstrapDialog from './CommonComponents/BootstrapDialog';
import BootstrapDialogTitle from './CommonComponents/BootstrapDialogTitle';

export default function PickStepModal({
  open,
  onClose,
  setStepIndex,
  selectedRes
}) {
  const [stepInputValue, setStepInputValue] = useState(1);
  const [inputErrorText, setInputErrorText] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleClose = () => {
    onClose();

    setStepInputValue(1);
    setInputErrorText('');
    setInputError(false);
  };

  const handleChange = (event) => {
    const regexp = /^[0-9]*$/;
    if (regexp.test(event.target.value)) {
      setStepInputValue(event.target.value);
    }
  };

  const onStart = () => {
    if (
      stepInputValue - 1 < 0 ||
      stepInputValue > selectedRes.stepsArr.length
    ) {
      setInputError(true);
      setInputErrorText(
        `Значение должно быть в диапазоне 1 - ${
          selectedRes.stepsArr.length - 1
        }`
      );
    } else {
      setInputError(false);
      setInputErrorText('');

      setStepIndex(stepInputValue - 1);
    }
  };

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
            <PickStepText>Укажите шаг, с которого следует начать:</PickStepText>
            <PickStepInputWrap>
              <TextField
                error={inputError}
                id="outlined-error"
                type={'text'}
                label={inputErrorText}
                value={stepInputValue}
                onChange={handleChange}
                fullWidth
              />
            </PickStepInputWrap>
          </DialogContent>
          <DialogActions>
            <ButtonWithBorder onClick={onStart}>
              <span>Применить</span>
            </ButtonWithBorder>
          </DialogActions>
        </StepsModalContainer>
      </BootstrapDialog>
    </div>
  );
}
