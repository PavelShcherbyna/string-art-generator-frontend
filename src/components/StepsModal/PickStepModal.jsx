import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import { ButtonWithBorder } from '../reusableStyles';
import { PickStepText, StepsModalContainer, PickStepInputWrap } from './styles';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import BootstrapDialog from './CommonComponents/BootstrapDialog';
import BootstrapDialogTitle from './CommonComponents/BootstrapDialogTitle';
import { useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

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
  const intl = useIntl();

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
      setInputErrorText(
        intl.formatMessage(
          {
            id: 'select.step.modal.error',
            defaultMessage: 'Specify a value 1 - {maxSteps}'
          },
          { maxSteps: selectedRes.steps.length - 1 }
        )
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
            {location?.state?.from === 'saved' &&
            selectedRes?.currentIndex > 0 ? (
              <PickStepText>
                <FormattedMessage
                  id="select.step.modal.text.continue"
                  defaultMessage="You stopped at step {step}.{br}<code>Continue from step {step}</code>, or specify the step to start from:"
                  values={{
                    code: (text) => <span>{text}</span>,
                    step: selectedRes?.currentIndex + 1,
                    br: <br />
                  }}
                />
              </PickStepText>
            ) : (
              <PickStepText>
                <FormattedMessage
                  id="select.step.modal.text"
                  defaultMessage="Specify the step to start from:"
                />
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
                <span>
                  <FormattedMessage
                    id="select.step.modal.btn"
                    defaultMessage="Apply"
                  />
                </span>
              </ButtonWithBorder>
            </PickStepInputWrap>
          </DialogContent>
        </StepsModalContainer>
      </BootstrapDialog>
    </div>
  );
}
