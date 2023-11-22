import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ButtonWithBorder } from '../reusableStyles';
import { PickStepText, StepsModalContainer, PickStepInputWrap } from './styles';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import BootstrapDialog from './CommonComponents/BootstrapDialog';
import BootstrapDialogTitle from './CommonComponents/BootstrapDialogTitle';
import { useLocation } from 'react-router-dom';

export default function PickStepModal({
  open,
  onClose,
  setStepIndex,
  selectedRes
}) {
  const [stepInputValue, setStepInputValue] = useState(1);
  const [inputErrorText, setInputErrorText] = useState('');
  const [inputError, setInputError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (selectedRes?.currentIndex) {
      setStepInputValue(selectedRes.currentIndex + 1);
    }
  }, [selectedRes]);

  const handleClose = () => {
    onClose();

    // setStepInputValue(1);
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
      stepInputValue > selectedRes.steps.length - 1
    ) {
      setInputError(true);
      setInputErrorText(`Укажите значение 1 - ${selectedRes.steps.length - 1}`);
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
            {location?.state?.from === 'saved' &&
            selectedRes?.currentIndex > 0 ? (
              <PickStepText>
                Вы остановились на {selectedRes?.currentIndex + 1} шаге.
                <br />
                <span>Продолжить с {selectedRes?.currentIndex + 1} шага</span>,
                или укажите шаг, с которого следует начать:
              </PickStepText>
            ) : (
              <PickStepText>
                Укажите шаг, с которого следует начать:
              </PickStepText>
            )}

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
              <ButtonWithBorder onClick={onStart}>
                <span>Применить</span>
              </ButtonWithBorder>
            </PickStepInputWrap>
          </DialogContent>
          {/*<DialogActions>*/}
          {/*  */}
          {/*</DialogActions>*/}
        </StepsModalContainer>
      </BootstrapDialog>
    </div>
  );
}
